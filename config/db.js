import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    mongoose.connect("mongodb://0.0.0.0:27017/crud-app");
    console.log("db is connected now");
  } catch (error) {
    console.log("not connected");
  }
};
