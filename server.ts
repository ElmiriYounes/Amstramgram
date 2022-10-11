import express, { Express } from "express";
const cors = require("cors");
const { default: helmet } = require("helmet");
const dotenv = require("dotenv");
const bp = require("body-parser");
const routesAuth = require("./routes/auth.routes");
const routesUsers = require("./routes/users.routes");
const routesPosts = require("./routes/posts.routes");

// Initialization
const app: Express = express();
app.use(cors());
dotenv.config();

// Settings
app.set("port", process.env.PORT || 4000);

// Midlewares
// limit: "50mb" = fixing "413 Request Entity Too Large" errors
app.use(bp.json({limit: "50mb"}));
app.use(bp.urlencoded({ extended: false}));
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

// Global Variables

// Routes
app.use(routesUsers);
app.use(routesAuth);
app.use(routesPosts);

module.exports = app;
