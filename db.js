import { config } from "dotenv";
import { Sequelize } from "sequelize";

//dotenv

config();
const {} = process.env;

const sequelize = new Sequelize();

export default sequelize;
