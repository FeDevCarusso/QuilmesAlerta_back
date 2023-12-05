import { config } from "dotenv";
import { Sequelize } from "sequelize";

//dotenv

config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;
const db_url = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

//sequelize
const sequelizeOptions = {
  dialect: "postgres",
  logging: false,
};

const sequelize = new Sequelize(db_url, sequelizeOptions);

export default sequelize;
