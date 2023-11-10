import { Request, Response } from "express";

import { createUser } from "@controllers/UserController";
import NewUser from "@models/NewUser";

export default async function createUserMW(req: Request, res: Response) {
  try {
    // create user
    const user_model = new NewUser(req.body);
    const user = await createUser(user_model);

    if (user === false) {
      res.status(200).json({ message: "Email exists" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    //error
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
