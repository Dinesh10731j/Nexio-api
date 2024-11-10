import { config } from "dotenv";
config();

export const configuration ={
    Port:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    JWT_TOKEN:process.env.JWT_TOKEN,
    JWT_SECRET:process.env.JWT_SECRET,
}