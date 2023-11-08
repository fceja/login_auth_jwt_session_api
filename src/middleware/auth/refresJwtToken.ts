import { NextFunction, Request, Response } from "express";

import User from "../../models/User";
import { getSessionToken } from "../../controllers/AuthController";

export default function refreshJwtTokenMW(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.session.token = getSessionToken(
    req,
    req.session.email,
    req.session.userId
  );

  next();
}
