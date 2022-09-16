import express, { Express, Request, Response } from 'express';
const dotenv = require("dotenv");
const cors = require('cors')
const { default: helmet } = require("helmet");

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(helmet());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
