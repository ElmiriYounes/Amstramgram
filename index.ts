import express, { Express, Request, Response } from "express";
import { Mongoose } from "mongoose";
require('./database')
const app: Express = require("./server");

const port: number = app.get("port");

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
