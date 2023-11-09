import { Request, Response, NextFunction } from "express";
import { getSessionToken } from "../../controllers/AuthController";

/**
 *
 * @param req: Request
 * @param _res: Response
 * @param next: NextFunction
 *
 * - Assigns token generated from 'getSessionToken' function to session
 * - Invokes callback function
 **/

const refreshJwtTokenMW = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  req.session.token = getSessionToken(req.session.email, req.session.userId);

  next();
};

export default refreshJwtTokenMW;
