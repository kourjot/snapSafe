import {Router} from "express"
import {signup} from "../controller/user.js"
const userRouter=Router()
userRouter.post("/signup",signup)
export {userRouter}