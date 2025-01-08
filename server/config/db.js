import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongodb ${mongoose.connection.host}`);
    }catch(error){
        console.log(`MongoDb Connection error : ${error}`);
    }
}

export default connectDB;