import mongoose from "mongoose";

export const connectDb = async (uri: string) => {
  // console.log(process.env.MONGO_URI);
  if (!uri) throw new Error("MongoDB URI not provided.");

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); 
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected!");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

const mongooseInstance = mongoose
export {mongooseInstance};