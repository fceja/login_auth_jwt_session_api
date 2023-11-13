import bcrypt from "bcrypt";
import { Request, Response } from "express";

import dbPool from "@utils/DbInit";
import UserModel from "@models/UserModel";
import { UserRepository } from "@database/repositories/UserRepository";

export const createUser = async (userData: UserModel) => {
  try {
    // init user db repositiory
    const userDbrepo = new UserRepository(dbPool, "_users");

    // check if user already exists
    const rows = await userDbrepo.getUserByEmail(userData.email);
    if (Object.entries(rows).length) throw new Error("Email exists");

    // hash user password
    userData.password = bcrypt.hashSync(userData.password, 10);

    // create user
    const createdUser = await userDbrepo.createUser(userData);

    // update newly created user role
    if (!(await userDbrepo.updateUserRole(createdUser.user_id, "user")))
      throw new Error("Error updating user role");

    return createdUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    // init user db repo
    const userDbrepo = new UserRepository(dbPool, "_users");

    // retrieve user by userId
    const user = await userDbrepo.getUserByUserId(req.session.userId);
    if (!user) throw new Error("Error getting user");

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);

    res.status(401).json({ message: "Not authorized" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // init user db repo
    const userDbrepo = new UserRepository(dbPool, "_users");

    // retrieve all records for table
    const users = await userDbrepo.retrieveAllTableRecords();

    // return users;
    res.status(200).json({ "from GET /user/getUsers": users });
  } catch (error) {
    console.error(error);

    res.status(400).json(console.error(error));
  }
};
