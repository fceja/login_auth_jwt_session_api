import assert from "assert";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PoolClient } from "pg";

import CONFIG_FILE from "@configs/Config";
import dbPool from "@utils/DbInit";
import _SessionData from "@appTypes/express-session/Index";
import User from "@models/User";

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

/**
 *
 * @param {Request} req - Express Request object.
 *
 * @returns {boolean} true | false - Boolean result for JWT token validity.
 *
 * @description
 * - Decodes and Verifies that the session JWT token is valid.
 *  - If invalid, throws error and returns false.
 *  - If valid, returns true.
 *
 **/
export const validateJwtToken = (req: Request) => {
  try {
    const decoded = jwt.verify(
      req.session.token,
      CONFIG_FILE.AUTH_JWT_SECRET_KEY
    );

    if (decoded instanceof Object) {
      assert(
        decoded.userId === req.session.userId,
        "Expected id's to match but did not."
      );
      assert(
        decoded.email === req.session.email,
        "Expected emails's to match but did not."
      );

      return true;
    } else {
      console.log(`\n\nentered Erro`);
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
