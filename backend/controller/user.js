import {User} from "../model/user.js"
import argon2 from "argon2"
import jwt  from "jsonwebtoken"
import "dotenv/config"

const key=process.env.Key

const signup=async(req,res)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password){
        return res.status(404).json({message:"all fields are required"})
    }
    const hash=await argon2.hash(password)
    try{
    const user=new User({
        username,
        email,
        password: hash
    })
    await user.save()
    res.status(200).json({message:"user created successfully"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
const login =async(req,res)=>{
    try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    const vaild=await argon2.verify(user.password,password)
    if(vaild){
        const token=jwt.sign({name:user.username,email:user.email},key,{
            expiresIn:"1 day"
        })
        return res.status(200).json({msg:"user login ",token:token})
    }
    res.status(200).json({message:"login success"})
    }catch(err){
        res.status(500).json({error: err.message})

    }
}
export {signup,login}