import express from "express"
import "dotenv/config"
import {connection} from "./db.js"
import {userRouter} from "./router/user.js"
const app=express()
const Port=process.env.PORT || 2003
app.use(express.json())
app.use("/",userRouter)
app.listen(Port,()=>{
    console.log(`server started at port ${Port}`);
    connection()
})

