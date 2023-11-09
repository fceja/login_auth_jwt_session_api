import { dbConfig } from "../config/DbConfig";
import { Pool } from "pg";

const dbPool = new Pool({
  host: dbConfig.HOST,
  database: dbConfig.DB_NAME,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  port: parseInt(dbConfig.PORT),
});

export default dbPool;
