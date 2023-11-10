import { Request, Response } from "express";

import { getUser } from "@controllers/UserController";

export default async function getUserMidW(req: Request, res: Response) {
  try {
    const user = await getUser(req.session.userId);
    res.status(200).json({ user });
  } catch {
    res.status(401).json({ message: "Not authorized" });
  }
}
