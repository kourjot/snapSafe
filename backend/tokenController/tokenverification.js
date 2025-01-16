import jwt from "jsonwebtoken"
import "dotenv/config"

export const tokenVerify=async(req,res,next)=>{
    const token=req.headers["authorization"]
    try{
       const verify= jwt.verify(token,process.env.key)
       if(!verify){
        return res.status(404).json({message:"token not verified"})
       }
       next()
    }catch(err){
        return res.status(500).send(err)
    }
}