import { dbConfig } from "../config/dbConfig";
import { Pool } from 'pg';

const dbPool = new Pool({
    user: dbConfig.USER,
    host: dbConfig.HOST,
    database: dbConfig.DB_NAME,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT,
})

export default dbPool;