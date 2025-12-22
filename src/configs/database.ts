import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;
    if (connectionString) {
      await connect(connectionString);
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
