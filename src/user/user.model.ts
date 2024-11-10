import { signupType, contactType } from "../types/types";
import mongoose from "mongoose";

const signupSchema = new mongoose.Schema<signupType>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "E-mail is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const contactSchema = new mongoose.Schema<contactType>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "E-mail is required"],
  },

  message: {
    type: String,
    required: [true, "Message is required"],
  },
});

export const contactModel = mongoose.model<contactType>(
  "Contacts",
  contactSchema
);

export const signupModel = mongoose.model<signupType>("Users", signupSchema);
