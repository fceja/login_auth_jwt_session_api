import { NextFunction, Request, Response } from "express";

export default function requireAdminMidW(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // verify user has admin role
  if (!(req.session.userRole === "admin")) {
    res.status(401).send({ message: "Unauthorized" });
  }

  // user is authorized, pass request to next function
  next();
}
