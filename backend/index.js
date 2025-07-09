import express from "express";
import { configDotenv } from "dotenv";
import router from "./routes/user.routes.js";
import startServer from "./server.js";
configDotenv();
const app = express();
app.use(express.json());
const port = process.env.port;
const mongoUrl = process.env.MONGODB_URI;
app.use("/api", router);

startServer(mongoUrl, app, port);
