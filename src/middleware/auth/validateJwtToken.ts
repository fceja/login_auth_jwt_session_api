import { NextFunction, Request, Response } from "express";
import { validateJwtToken } from "../../controllers/AuthController";

/**
 *
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express NextFunction for invoking the next middleware.
 *
 * @returns {Response|NextFunction}
 * - {Response} - response with error status and invalid json message.
 * OR
 * - {NextFunction} - invokes next middleware function.
 *
 * @description
 * - Invokes 'validateJwtToken' function for JWT token validity
 *  - If invalid, sends 401 response with invalid user message
 *  - If valid, passes request to next middleware function
 *
 **/
const validateJwtTokenMW = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validate jwt token
  const isJwtValid = validateJwtToken(req);
  if (!isJwtValid) {
    return res.status(401).send({
      message: "Invalid user",
    });
  }

  // jwt is valid
  return next();
};

export default validateJwtTokenMW;
