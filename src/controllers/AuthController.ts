import bcrypt from "bcrypt";
import { Request, Response } from "express";

import dbPool from "@utils/DbInit";
import { getSessionTokenMidW } from "@middleware/auth/GetSessionTokenMidW";
import _SessionData from "@appTypes/express-session/Index";
import UserModel from "@models/UserModel";
import { UserRepository } from "@database/repositories/UserRepository";

const testDbBaseRepoFind = async () => {
  const repository = new UserRepository(dbPool, "_users");

  const userModel = {
    email: "fceja@myemail.com",
    password: "",
    createdAt: "",
    lastUpdated: "",
  };

  const results = await repository.find(userModel);

  // log result(s)
  if (results) {
    results.forEach((result) => {
      console.log(`\n${Object.entries(result)}`);
    });
  }
};

const testDBBaseRepoCreate = async () => {
  const repository = new UserRepository(dbPool, "_user_roles");

  const userRoleModel = {
    user_id: "63",
    role: "user",
  };

  // log result
  const result = await repository.create(userRoleModel);
  if (result) {
    console.log(`created -> ${result}`);
  }
};

const parseUserDataToSession = (req: Request, storedUserData: UserModel) => {
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
  req.session.userId = JSON.parse(JSON.stringify(storedUserData)).user_id;
  req.session.email = JSON.parse(JSON.stringify(storedUserData)).email;
  req.session.userRole = JSON.parse(JSON.stringify(storedUserData)).role;

  // get session jwt token
  req.session.token = getSessionTokenMidW(req);
};

const validatePassword = (
  payloadUserPass: string,
  storedUserPass: string
): boolean => {
  return bcrypt.compareSync(payloadUserPass, storedUserPass);
};

// TODO - handle incorrect login gracefully
export const loginAuth = async (req: Request, _res: Response) => {
  // parse user data from payload
  const payloadUserData = new UserModel(req.body);

  // init user db repo
  const userDbrepo = new UserRepository(dbPool, "_users");

  // get user data from db
  const storedUserData: UserModel = await userDbrepo.getUserAndRoleByEmail(
    payloadUserData.email
  );
  if (!storedUserData) {
    return false;
  }

  // verify password is valid
  const isPassValid = validatePassword(
    payloadUserData.password,
    storedUserData.password
  );
  if (!isPassValid) {
    return false;
  }

  // parse user data to session
  parseUserDataToSession(req, storedUserData);

  return true;
};
