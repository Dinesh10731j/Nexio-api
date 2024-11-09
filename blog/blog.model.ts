import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    title: { type: String, required: true },
    image: {
      url: String,
      caption: String,
    },

    content: { type: String, required: true },
    publishedDate: {
      type: Date,
      default: Date.now(),
    },
    readingTime:{
      type:Number,
    },
  },

  { timestamps: true }
);

export const blogModel = mongoose.model("Blogs", blogSchema);
