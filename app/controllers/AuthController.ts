import dbPool from "../utils/dbInit";

const authConfig = require("../config/authConfig");
const bcrypt = require("bcrypt");
const dbService = require("../services/dbUserService");
const jwt = require("jsonwebtoken");

export const loginAuth = async (user, req, res) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // check if email already exists
  const emailExists = await dbService.ifUserExists(dbConn, user.email);
  if (!emailExists) {
    // email exists, terminate db connection
    dbConn.end();

    return false;
  }

  // query db with user email
  const query = await dbConn.query(
    `select * from _user where email='${user.email}'`
  );

  // check if password is valid
  const isPassValid = bcrypt.compareSync(user.password, query.rows[0].password);
  if (!isPassValid) {

    return false;
  }

  // get session jwt token
  req.session.token = exports.getSessionToken(req, user);

  return true;
};

export const getSessionToken = (req, user) => {
  // assign jwt token
  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 10, // 10 secs
  });

  return token;
};
