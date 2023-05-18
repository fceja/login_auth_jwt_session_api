import { Request, Response } from "express";

import { createUser } from "../../controllers/UserController";
import newUser from "../../models/newUser";

export default async function createUserMW(req: Request, res: Response) {
  try {
    // create user
    let user = new newUser(req.body);
    user = await createUser(user);

    if (user === 'exists') {
      res.status(200).json({ message: "Email exists"});

    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    //error
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
