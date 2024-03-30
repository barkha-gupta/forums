import mongoose from "mongoose";
//mongodb+srv://barkhagupta:<password>@cluster0.hnm2wmc.mongodb.net/
const MONGO_URI = process.env.MONGO_URI;
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!MONGO_URI) return console.log("MongoDB URL not found");

  if (isConnected) return console.log("Already Connected To DB");

  try {
    await mongoose
      .connect(MONGO_URI)
      .then(() => console.log("connected to db"));
    isConnected = true;
  } catch (error) {
    console.log("connection to db failed: " + error);
  }
};
