import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  DB_TYPE: process.env.DB_TYPE,
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  PORT: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  pool: process.env.DB_POOL,
};
