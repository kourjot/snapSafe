import {Router} from "express"
import {signup,login,getuser} from "../controller/user.js"
import { upload,profile_photo } from "../controllerProfile/profile.js"
import { tokenVerify } from "../tokenController/tokenverification.js"
import { uploaded } from "../controller/userData.js"
const userRouter=Router()



userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/",getuser)
userRouter.use(tokenVerify)
userRouter.post("/profilePhoto",upload.single("profile"),profile_photo)
userRouter.post("/uploadData",upload.single("data"),uploaded)
export {userRouter}