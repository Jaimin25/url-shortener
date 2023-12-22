import mongoose from "mongoose";

export async function connectDb(url: string) {
    return mongoose.connect(url);
}
