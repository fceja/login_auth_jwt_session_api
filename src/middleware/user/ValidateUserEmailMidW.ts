import { NextFunction, Request, Response } from "express";

import dbPool from "@utils/DbInit";
import UserModel from "@models/NewUserModel";
import { UserRepository } from "@database/repositories/UserRepository";

export const userEmailAndRoleExistsMW = () => {};

export const userEmailDoesNotExistMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // parse user data from payload
    const userModel = new UserModel(req.body);

    // init user db repo
    const userDbrepo = new UserRepository(dbPool, "_users");

    // check if record exists in db
    const rows = await userDbrepo.getUserByEmail(userModel.email);
    if (Object.entries(rows).length) throw new Error("Email exists");

    // email does not already exist, continue to pass request to next function
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Email error." });
  }
};
