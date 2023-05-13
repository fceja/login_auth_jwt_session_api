const { Client } = require('pg');
const dbConfig = require('../config/dbConfig')

const dbConn = new Client({
    user: dbConfig.USER,
    host: dbConfig.HOST,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT,
})

export default dbConn;