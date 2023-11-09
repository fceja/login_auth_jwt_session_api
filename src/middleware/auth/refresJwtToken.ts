import { Request, Response, NextFunction } from "express";
import { getSessionToken } from "../../controllers/AuthController";

export default function refreshJwtTokenMW(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  req.session.token = getSessionToken(req.session.email, req.session.userId);
  next();
}
