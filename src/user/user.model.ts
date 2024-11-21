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

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "UserId is required"],
  },

  profileUrl: String,
});

export const userProfileModel = mongoose.model(
  "UserProfiles",
  userProfileSchema
);

export const contactModel = mongoose.model<contactType>(
  "Contacts",
  contactSchema
);

export const signupModel = mongoose.model<signupType>("Users", signupSchema);
