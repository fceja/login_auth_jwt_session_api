const dbConfig = require('../config/dbConfig')

const { Client } = require(dbConfig.DB_TYPE);

const dbConn = new Client({
    user: dbConfig.USER,
    host: dbConfig.HOST,
    database: dbConfig.DB_NAME,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT,
})

export default dbConn;