import dbPool from "../utils/dbInit";

const bcrypt = require("bcrypt");

export default async function createUserController(user) {
  // init db connection
  const dbConn = await dbPool.connect();

  // check if email alrady exists
  const emailExists = await ifEmailExists(dbConn, user.email);
  if (emailExists) {
    dbConn.end();

    return null;
  }

  // create account
  try {
    // db query, create account
    const query = await dbConn.query(
      ` insert into "Users" (email, password, "createdAt", "lastUpdated")
      values ($1, $2, $3, $4)
      on conflict (email) do nothing
      returning id, email, "createdAt", "lastUpdated"
      `,
      [
        user.email,
        bcrypt.hashSync(user.password, 10),
        user.createdAt,
        user.lastUpdated,
      ]
    );

    dbConn.end();

    return query.rows;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function ifEmailExists(dbConn, email) {
  try {
    // db query, retrieve email if exists
    const query = await dbConn.query(
      `select * from "Users" where email='${email}'`
    );

    return query.rowCount > 0 ? true : false;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
