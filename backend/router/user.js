import {Router} from "express"
import {signup,login,getuser} from "../controller/user.js"
import { upload,profile_photo } from "../controllerProfile/profile.js"
import { tokenVerify } from "../tokenController/tokenverification.js"
const userRouter=Router()
userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/",getuser)
userRouter.use(tokenVerify)
userRouter.post("/profilePhoto",upload.single("profile"),profile_photo)
export {userRouter}