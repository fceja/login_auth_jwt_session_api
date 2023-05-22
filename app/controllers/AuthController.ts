import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { authConfig } from "../config/authConfig";
import { dbGetUserByEmail } from "../services/dbUserService"
import dbPool from "../utils/dbInit";


export const getSessionToken = (req, user) => {
  // assign jwt token
  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 10, // 10 secs
  });

  return token;
};

export const loginAuth = async (userData, req, res) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // get existing user
  const user = (await dbGetUserByEmail(dbConn, userData.email)).rows[0];
  if (!user) {
    dbConn.end();

    return false;
  }

  // check if password is valid
  const isPassValid = bcrypt.compareSync(userData.password, user.password);
  if (!isPassValid) {

    return false;
  }

  // TODO: get role

  // get session jwt token
  req.session.token = exports.getSessionToken(req, userData);

  return true;
};

export const validateJwtToken = (req) => {
  jwt.verify(req.session.token, authConfig.secret);
}