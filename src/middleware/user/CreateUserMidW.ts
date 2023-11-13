import { Request, Response } from "express";

import { createUser } from "@controllers/UserController";
import NewUserModel from "@models/NewUserModel";

export default async function createUserMidW(req: Request, res: Response) {
  try {
    // create user
    const user_model = new NewUserModel(req.body);
    const user = await createUser(user_model);

    if (!user) throw new Error("User not created");

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Email error" });
  }
}
