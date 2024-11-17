
import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ["header", "image", "paragraph", "list"],
      required: true,
    },
    data: {
      // For header type
      text: { type: String },
      level: { type: Number },

      // For image type
      caption: { type: String },
      file: {
        url: { type: String },
      },
      stretched: { type: Boolean, default: false },
      withBackground: { type: Boolean, default: false },
      withBorder: { type: Boolean, default: false },

      // For paragraph type
      ParagraphText: { type: String },

      // For list type (Add this part)
      style: { type: String, enum: ["unordered", "ordered"] }, // Specifying style of list
      items: { type: [String], default: [] }, // Array of list items
    },
  },
  { _id: false } // Disabling _id for nested blocks for cleaner documents
);

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    blocks: [blockSchema], 
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    readingTime: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const blogModel = mongoose.model("Blogs", blogSchema);
