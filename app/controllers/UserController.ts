import dbPool from "../utils/dbInit";

const bcrypt = require("bcrypt");
const dbService = require("../services/dbUserService")

exports.createUser = async (user) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // check if email exists
  const emailExists = await dbService.ifUserExists(dbConn, user.email);
  if (emailExists) {
    // email already exists, terminate db connection
    dbConn.end();

    return null;
  }

  try {
    // create account in db
    const query = await dbConn.query(
      ` insert into _user (email, password, created_at, last_updated)
      values ($1, $2, $3, $4)
      on conflict (email) do nothing
      returning user_id, email, created_at, last_updated
      `,
      [
        user.email,
        bcrypt.hashSync(user.password, 10),
        user.createdAt,
        user.lastUpdated,
      ]
    );

    // terminate db connection
    dbConn.end();

    return query.rows;

  } catch (err) {
    console.error(`Error: ${err}`);
  }
};
