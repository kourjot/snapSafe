import {User} from "../model/user.js"
import argon2 from "argon2"
const signup=async(req,res)=>{
    const {username,email,password}=req.body
    const hash=await argon2.hash(password)
    try{
    const user=new User({
        username,
        email,
        password: hash
    })
    await user.save()
    res.status(201).json({message:"user created successfully"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
export {signup}