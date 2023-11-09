import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PoolClient } from "pg";

import _SessionData from "../types/express-session/index";
import { authConfig } from "../config/AuthConfig";
import dbPool from "../utils/DbInit";
import User from "../models/User";

export const loginAuth = async (
  userData: User,
  req: Request,
  _res: Response
) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // get existing user and role
  const retUser = (await dbGetUserByEmailWithRole(dbConn, userData.email))
    .rows[0];

  if (!retUser) {
    dbConn.release();

    return false;
  }

  // check if password is valid
  const isPassValid = bcrypt.compareSync(userData.password, retUser.password);
  if (!isPassValid) {
    return false;
  }
  req.session.userId = JSON.parse(JSON.stringify(retUser)).user_id;
  req.session.email = JSON.parse(JSON.stringify(retUser)).email;
  req.session.userRole = JSON.parse(JSON.stringify(retUser)).role;

  req.session.token = exports.getSessionToken(
    req.session.email,
    req.session.userId
  );

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
    expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRY),
  };

  // generate jwt token with expiry
  const jwtToken = jwt.sign(jwtSignPayload, authConfig.secret, jwtSignOptions);

  return jwtToken;
};

export const validateJwtToken = (req: Request) => {
  const decoded = jwt.verify(req.session.token, authConfig.secret);
  assert(
    decoded.userId === req.session.userId,
    "Expected id's to match but did not."
  );
  assert(
    decoded.email === req.session.email,
    "Expected emails's to match but did not."
  );
};
