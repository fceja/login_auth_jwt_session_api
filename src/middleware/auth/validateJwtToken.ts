import { NextFunction, Request, Response } from "express";
import { validateJwtToken } from "../../controllers/AuthController";

export default function validateJwtTokenMW(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // check if valid jwt
    validateJwtToken(req);
    next();
  } catch (err) {
    console.error(err);
  }

  return res.status(401).send({
    message: "Token error",
  });
}
