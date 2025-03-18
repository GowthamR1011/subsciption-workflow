import mongoose from "mongoose";
import { NODE_ENV,DB_URI } from "../config/config.js";

if(!DB_URI){
    throw new Error('Mongo URI is missing. Check your environment variables');
}


const connectDB = async () => {
    try {

        await mongoose.connect(DB_URI);
        console.log(`Connected to Database in ${NODE_ENV} mode`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;