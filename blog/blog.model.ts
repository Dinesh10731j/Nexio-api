import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blog:{
        type:String,
        required:true,
    }
});


export const blogModel = mongoose.model('Blogs',blogSchema);
