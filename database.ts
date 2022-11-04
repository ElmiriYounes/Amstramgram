import mongoose, { Mongoose } from "mongoose";
const dotenv = require("dotenv");

dotenv.config();

const uri: string = process.env.MONGODB_URL!;
const dbName = process.env.MONGODB_DBNAME!;

mongoose
  .connect(uri, { dbName: dbName })
  .then((db) => console.log("Database connected"))
  .catch((err) => console.error(err));
