const dbConfig = require('../config/dbConfig')
const { Pool } = require('pg');

const dbPool = new Pool({
    user: dbConfig.USER,
    host: dbConfig.HOST,
    database: dbConfig.DB_NAME,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT,
})

export default dbPool;