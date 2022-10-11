import mongoose, { Mongoose } from "mongoose";
const dotenv = require("dotenv");

dotenv.config();

const uri: string = process.env.MONGODB_URL!;

mongoose
  .connect(uri)
  .then((db) => console.log("Database connected"))
  .catch((err) => console.error(err));
