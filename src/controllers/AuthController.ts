import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PoolClient } from "pg";

import CONFIG_FILE from "@configs/Config";
import dbPool from "@utils/DbInit";
import _SessionData from "@appTypes/express-session/Index";
import UserModel from "@models/UserModel";

// TODO - handle incorrect login gracefully
export const loginAuth = async (req: Request, _res: Response) => {
  // parse user data from payload
  const payloadUserData = new UserModel(req.body);

  // init db connection
  const dbConn = await dbPool.connect();

  // get user data from db if it exists
  const dbUserData = (
    await dbGetUserByEmailWithRole(dbConn, payloadUserData.email)
  ).rows[0];

  // terminate db connection
  dbConn.release();

  // verify db user returned
  if (!dbUserData) {
    return false;
  }

  // verify password is valid
  const isPassValid = bcrypt.compareSync(
    payloadUserData.password,
    dbUserData.password
  );
  if (!isPassValid) {
    return false;
  }

  // NOTE
  // session data is not saved in the cookie itself, just the session id.
  // session data is stored server-side.

  // parse user data into session
  req.session.userId = JSON.parse(JSON.stringify(dbUserData)).user_id;
  req.session.email = JSON.parse(JSON.stringify(dbUserData)).email;
  req.session.userRole = JSON.parse(JSON.stringify(dbUserData)).role;
  req.session.token = getSessionToken(req.session.email, req.session.userId);

  return true;
};

const dbGetUserByEmailWithRole = (dbConn: PoolClient, email: string) => {
  return dbConn.query(
    `
    select *
    from _user t1
    left join _user_role t2 on t1.user_id = t2.user_id
    where t1.email='${email}' and t2.role is not NULL
    `
  );
};

/**
 *
 * @param {string} email - User email for token generation.
 * @param {string} userId - User id for token generation.
 *
 * @returns {string} jwtToken - Generated JWT token.
 *
 * @description
 * - Generates and returns JWT token with an expiry.
 *
 **/
export const getSessionToken = (email: string, userId: string) => {
  // define vars for 'jwt.sign' function
  const jwtSignPayload = {
    email: email,
    userId: userId,
  };
  const jwtSignOptions = {
    expiresIn: parseInt(CONFIG_FILE.AUTH_JWT_TOKEN_EXPIRY),
  };

  // generate jwt token with expiry
  const jwtToken = jwt.sign(
    jwtSignPayload,
    CONFIG_FILE.AUTH_JWT_SECRET_KEY,
    jwtSignOptions
  );

  return jwtToken;
};
