import { Data } from "../model/data.js";
import { v2 } from "cloudinary";
import jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs";
import { send } from "process";
v2.config({
  cloud_name: 'dauds0p8p',
  api_key: '215473884174485',
  api_secret: 'XjUxO4DgjxUVS0dXPTVdABHkHjw',
  secure: true,
});

export const uploaded = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).json({ message: "Token is required" });
  }

  try {
    const tokenData = jwt.verify(token, process.env.key);
    const email = tokenData.email;

    const url = await v2.uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path);

    const userExist = await Data.findOne({ email });

    if (!userExist) {
      const newUser = new Data({
        email: email,
        data: [url.secure_url],
      });
      await newUser.save();
    } else {
      userExist.data.push(url.secure_url);

      await userExist.save();
    }

    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};



export const getMyData=async(req,res)=>{
    const token=req.headers.authorization
    try{
        const data=jwt.verify(token,process.env.key)
        const email=data.email
        const sendData = await Data.findOne({ email })
        if(!sendData){
         return   res.status(404).json({message:"No file Uploaded yet"})
        }
        res.status(200).json({data:sendData.data})
    }catch{
        res.status(500).json({msg:"error in get my data",err:err.message})
    }
}