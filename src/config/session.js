import { config } from "dotenv";

config();

const sessionOptions = {
  resave: true,
  saveUninitialized: true,
  secret: process.env.SECRET,
};

export default sessionOptions;
