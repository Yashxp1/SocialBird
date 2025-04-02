import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MONGODB connected successfully!!")
  } catch (error) {
    console.error("Error connecting to MONGODB" , error)
    process.exit(1)
  }
}