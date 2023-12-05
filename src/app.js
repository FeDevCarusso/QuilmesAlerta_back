import express from "express";
import { Server, createServer } from "http";
import logger from "./config/logger.js";
import passport from "passport";
import configurePassport from "./config/passport.js";
import session from "express-session";
import sessionOptions from "./config/session.js";
import router from "./routes/index.js";

//serve
const app = express();
const server = createServer(app);
const io = new Server(server);

//middlewares

//session

app.use(session(sessionOptions));

//socket.io
app.use(function (req, res, next) {
  try {
    req.io = io;
    return next();
  } catch (error) {
    logger.info("");
  }
});

//passport
app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

//routes
app.use(router);

export default server;
