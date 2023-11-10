import assert from "assert";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import CONFIG_FILE from "@configs/Config";

const decodeJwtToken = (req: Request) => {
  try {
    const decodedToken = jwt.verify(
      req.session.token,
      CONFIG_FILE.AUTH_JWT_SECRET_KEY
    );

    return { decodedJwtToken: decodedToken };
  } catch (error) {
    console.error(error);

    return { decodedJwtToken: null };
  }
};

const returnErrorResponse = (res: Response) => {
  return res.status(401).send({
    message: "Invalid user",
  });
};

const validateJwtToken = (
  req: Request,
  decodedJwtToken: string | jwt.JwtPayload
) => {
  try {
    if (decodedJwtToken instanceof Object) {
      assert(
        decodedJwtToken.userId === req.session.userId,
        "Expected id's to match but did not."
      );
      assert(
        decodedJwtToken.email === req.session.email,
        "Expected emails's to match but did not."
      );

      return { isJwtTokenValid: true };
    } else {
      throw new Error();
    }
  } catch (error) {
    return { isJwtTokenValid: false };
  }
};

/**
 *
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express NextFunction.
 *
 * @returns {Response|NextFunction}
 *
 * @description
 * - Decodes and Verifies that the session JWT token is valid.
 *  - If invalid
 *    - {Response} - returns error status.
 *  - If valid
 *    - {NextFunction} - passes request to next middleware function.
 *
 **/
const validateJwtTokenMidW = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // decode session jwt token
  const { decodedJwtToken } = decodeJwtToken(req);
  if (!decodedJwtToken) {
    return returnErrorResponse(res);
  }

  // validate session jwt token
  const { isJwtTokenValid } = validateJwtToken(req, decodedJwtToken);
  if (!isJwtTokenValid) {
    return returnErrorResponse(res);
  }

  // jwt is valid, invoke next
  return next();
};

export default validateJwtTokenMidW;
