import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
};
