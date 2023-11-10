import { NextFunction, Request, Response } from "express";

export default function requireAdminMidW(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.userRole === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Access denied" });
  }
}