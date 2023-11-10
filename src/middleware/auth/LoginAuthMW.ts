import { Request, Response } from "express";

import { loginAuth } from "@controllers/AuthController";

export default async function loginAuthMW(req: Request, res: Response) {
  const authd = await loginAuth(req, res);

  if (!authd) {
    res.status(200).json({ message: "Not authorized" });
  }

  res.status(200).json({ message: "Authorized" });
}
