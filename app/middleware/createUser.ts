import { Request, Response } from "express";

import newUser from "../models/newUser";

const UserController = require("../controllers/UserController");

export async function createUser(req: Request, res: Response) {
  try {
    // create user
    let user = new newUser(req.body);
    user = await UserController.createUserCtrl(user);

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
