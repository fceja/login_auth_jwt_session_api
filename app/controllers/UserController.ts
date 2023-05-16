import dbPool from "../utils/dbInit";

const authConfig = require("../config/authConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUserCtrl = async (user) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // check if email exists
  const emailExists = await exports.ifEmailExists(dbConn, user.email);
  if (emailExists) {
    // email already exists, terminate db connection
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

    // terminate db connection
    dbConn.end();

    return query.rows;

  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

exports.loginUserCtrl = async (user, req, res) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // check if email already exists
  const emailExists = await exports.ifEmailExists(dbConn, user.email);
  if (!emailExists) {
    // email exists, terminate db connection
    dbConn.end();

    return false;
  }

  // query db with user email
  const query = await dbConn.query(
    `select * from "Users" where email='${user.email}'`
  );

  // check if password is valid
  const isPassValid = bcrypt.compareSync(user.password, query.rows[0].password);
  if (!isPassValid) {

    return false
  }

  // assign jwt token
  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 30, // 30 mins
  });
  req.session.token = token;

  return true
};

exports.ifEmailExists = async (dbConn, email) => {
  try {
    // retrieve email from db if exists
    const query = await dbConn.query(
      `select * from "Users" where email='${email}'`
    );

    return query.rowCount > 0 ? true : false;

  } catch (err) {
    console.error(`Error: ${err}`);
  }
};
