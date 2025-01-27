import multer from "multer";
import V2 from "cloudinary"
import { profilePhoto } from "../model/profilePhoto.js";
import "dotenv/config"
import jwt from "jsonwebtoken";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename,"uploads/"); 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname)
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

export const upload=multer({storage:storage})

V2.config({
    cloud_name: "dauds0p8p",
    api_key: "215473884174485",
    api_secret: "XjUxO4DgjxUVS0dXPTVdABHkHjw",
  });
  

export const profile_photo = async (req, res) => {
    // console.log("vijay");
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const tokenData = jwt.verify(token, process.env.key);
        const { email } = tokenData;

        let x = await V2.uploader.upload(req.file.path);

        fs.unlink(req.file.path, async (err) => {
            if (err) {
                return res.status(404).json({ message: "Error deleting the file from the server" });
            }

            try {
                const profileData = await profilePhoto.findOne({ email: email });
                if (profileData) {
                    await profileData.updateOne({ email: email }, { $set: { profileUrl: x.secure_url } });
                    return res.status(200).json({ message: "Profile photo updated successfully"});
                } else {
                    const newProfile = new profilePhoto({
                        email: email,
                        profileUrl: x.secure_url
                    });
                    await newProfile.save();
                    return res.status(201).json({ message: "Profile photo uploaded successfully"});
                }
            } catch (dbError) {
                return res.status(500).json({ message: "Database operation failed", error: dbError.message });
            }
        });
    } catch (err) {
        console.error("Error processing the request", err);
        return res.status(500).json({ message: "Error processing the request", error: err.message });
    }
};