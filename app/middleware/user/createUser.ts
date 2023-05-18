import { Request, Response } from "express";

import { createUser } from "../../controllers/UserController";
import newUser from "../../models/newUser";

export async function createUserMidW(req: Request, res: Response) {
  try {
    // create user
    let user = new newUser(req.body);
    user = await createUser(user);

    // return response
    if (!user) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.json({ user });
    }
  } catch (err) {
    //error
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
