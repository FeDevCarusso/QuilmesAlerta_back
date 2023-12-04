import express from "express";
import { Server, createServer } from "http";
import logger from "./config/logger.js";

//serve
const app = express();
const server = createServer(app);
const io = new Server(server);

//middlewares

//socket.io
app.use(function (req, res, next) {
  try {
    req.io = io;
    return next();
  } catch (error) {
    logger.info("")
  }
});

export default server