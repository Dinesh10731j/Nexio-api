import mongoose from "mongoose";
import { configuration } from "./config";

const connectDataBase = async ()=>{
    try{
        mongoose.connection.on('connected',()=>{
            console.log('Connected to database')
        });

        mongoose.connection.on('error',(err)=>{
            console.log('Error connectiong database',err);
        });


        await mongoose.connect(configuration.MONGO_URL as string);

    }catch(error){
        console.error('Failed to connect database',error);

        process.exit(1);

    };
};




export default connectDataBase;


