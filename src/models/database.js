import mongoose from "mongoose";

// membuat fungsi untuk konek ke mongodb
export async function connectDb() {
  await mongoose.connect(`${process.env.DATABASE_URL}`);
  console.log("Connected to database successfully");
}
