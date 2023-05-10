import mongoose from "mongoose";

export const DBConnect = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database has been successfully connected");
    } catch (error) {
        console.log(error);
    }
};