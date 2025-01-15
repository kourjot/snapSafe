import multer from "multer";
import fs from "fs"
const storage=multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

export const upload=multer({storage:storage})

export const profilePhoto=async(req,res)=>{
    // console.log("vijay");
    try{
        res.send("file uploaded")
    }catch(err){
        res.send("error")
    }
}