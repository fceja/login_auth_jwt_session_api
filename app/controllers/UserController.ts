import bcrypt from "bcrypt";

import dbPool from "../utils/dbInit";
import {ifUserExists} from "../services/dbUserService"


export const createUser = async (user) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // check if email exists
  const emailExists = await ifUserExists(dbConn, user.email);
  if (emailExists) {
    // email already exists
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

export const getUsers = async () => {
  // init db connection
  const dbConn = await dbPool.connect();

  // excecute query
  const data = await dbConn.query('select * from _user');

  // end db connection
  dbConn.end();

  return data.rows
}
