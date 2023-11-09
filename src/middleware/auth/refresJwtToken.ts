import { Request, Response, NextFunction } from "express";
import { getSessionToken } from "../../controllers/AuthController";

/**
 *
 * @param {Request} req - Express Request object.
 * @param {Response} _res - Express Response object (not used in this middleware).
 * @param {NextFunction} next - Express NextFunction for invoking the next middleware.
 *
 * @description
 * - Assigns token generated from 'getSessionToken' function to session.
 * - Invokes callback function.
 *
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
