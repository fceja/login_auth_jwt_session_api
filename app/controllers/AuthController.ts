import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { authConfig } from "../config/authConfig";
import dbPool from "../utils/dbInit";

const dbGetUserByEmailWithRole = (dbConn, email) => {
  return dbConn.query(
    `
    select *
    from _user t1
    left join _user_role t2 on t1.user_id = t2.user_id
    where t1.email='${email}' and t2.role is not NULL
    `
    );
}

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

  // get existing user and role
  const retUser = (await dbGetUserByEmailWithRole(dbConn, userData.email)).rows[0];
  if (!retUser) {
    dbConn.end();

    return false;
  }

  // check if password is valid
  const isPassValid = bcrypt.compareSync(userData.password, retUser.password);
  if (!isPassValid) {

    return false;
  }

  // store user role and token
  req.session.userRole = JSON.parse(JSON.stringify(retUser)).role;
  req.session.token = exports.getSessionToken(req, userData);

  return true;
};

export const validateJwtToken = (req) => {
  jwt.verify(req.session.token, authConfig.secret);
}