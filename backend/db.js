import { connect ,mongo} from "mongoose";
import "dotenv/config"
const mongo_url=process.env.mongo_url
const connection=async()=>{
    try{ 
        await connect(mongo_url);
        console.log("mongo connected");
    }catch(err){
        console.log("error in mongo connection",err);
    } 
  
} 
export  {connection}