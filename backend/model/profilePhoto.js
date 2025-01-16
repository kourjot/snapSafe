import { Schema,model } from "mongoose";

const ProfilePhoto=new Schema({
    email:{type:String,required:true},
    profileUrl:{type:String}
})

export const profilePhoto=model("profilePhoto",ProfilePhoto)
