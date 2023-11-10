import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PoolClient } from "pg";

import dbPool from "@utils/DbInit";
import { getSessionTokenMidW } from "@middleware/auth/GetSessionTokenMidW";
import _SessionData from "@appTypes/express-session/Index";
import UserModel from "@models/UserModel";

// TODO - handle incorrect login gracefully
// TODO - refactor into smaller funcs
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

  /* NOTE */
  /**
   *
   * - Session data is not saved in the cookie itself.
   * - Only session id is saved in cookie.
   *
   * - Session data is stored server-side.
   *
   **/

  // parse user data into session
  req.session.userId = JSON.parse(JSON.stringify(dbUserData)).user_id;
  req.session.email = JSON.parse(JSON.stringify(dbUserData)).email;
  req.session.userRole = JSON.parse(JSON.stringify(dbUserData)).role;

  // get session jwt token
  req.session.token = getSessionTokenMidW(req);

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
