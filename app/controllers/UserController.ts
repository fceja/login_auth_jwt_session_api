import dbPool from "../utils/dbInit";

const bcrypt = require("bcrypt");

export default class UserController {
  static async createUser(user) {
    // init db connection
    const dbConn = await dbPool.connect();

    // check if email alrady exists
    const emailExists = await UserController.ifEmailExists(dbConn, user.email);
    if (emailExists) {
      dbConn.end();

      return null;
    }

    try {
      // create account in db
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

  static async loginUser(user) {
    // init db connection
    const dbConn = await dbPool.connect();

    // check if email alrady exists
    const emailExists = await UserController.ifEmailExists(dbConn, user.email);
    if (!emailExists) {
      dbConn.end();

      return null;
    }

    const query = await dbConn.query(
      `select * from "Users" where email='${user.email}'`
    );

    return bcrypt.compareSync(user.password, query.rows[0].password);
  }

  static async ifEmailExists(dbConn, email) {
    try {
      // retrieve email if exists
      const query = await dbConn.query(
        `select * from "Users" where email='${email}'`
      );

      return query.rowCount > 0 ? true : false;
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
}
