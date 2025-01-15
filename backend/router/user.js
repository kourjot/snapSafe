import {Router} from "express"
import {signup,login} from "../controller/user.js"
const userRouter=Router()
userRouter.post("/signup",signup)
userRouter.post("/login",login)
export {userRouter}