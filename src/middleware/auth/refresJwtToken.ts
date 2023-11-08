import { NextFunction, Request } from "express";

import { getSessionToken } from "../../controllers/AuthController";

export default function refreshJwtTokenMW(req: Request, next: NextFunction) {
  req.session.token = getSessionToken(
    req,
    req.session.email,
    req.session.userId
  );

  next();
}
