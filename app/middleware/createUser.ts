import { Request, Response } from "express";

import createUserController from "../controllers/createUserController";
import newUser from "../models/newUser";

export async function createUser(req: Request, res: Response) {
  try {
    // create user
    let user = new newUser(req.body);
    user = await createUserController(user);

    // return response
    if (!user) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.json({ user });
    }
  } catch (err) {
    //error
    console.error(`Error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
