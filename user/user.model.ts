import { signupType } from "../types/types";
import mongoose from "mongoose";


const signupSchema = new mongoose.Schema<signupType>({
    name:{
        type:String,
        required:[true,'Name is required']
    },

    email:{
        type:String,
        required:[true,'E-mail is required'],
    },


    password:{
        type:String,
        required:[true,'Password is required']
    }


});



const signupModel = mongoose.model<signupType>('Users',signupSchema);

export default signupModel;