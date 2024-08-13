import mongoose from "mongoose";

export default function dbConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log('Database Connected :)');
    } catch (error) {
        console.log(error.message);
    }
}