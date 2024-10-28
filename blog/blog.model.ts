import mongoose from "mongoose";

   
    
   
    const blogSchema = new mongoose.Schema({
        title: { type: String, required: true },
        image: {
          url: String,
          caption: String,
        },
        content: { type: String, required: true },  
      }, { timestamps: true });
   



export const blogModel = mongoose.model('Blogs',blogSchema);
