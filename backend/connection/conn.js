
import mongoose from 'mongoose';

const conn = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log(error);
    }
}


export default conn;
