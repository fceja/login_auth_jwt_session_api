import { validateJwtToken } from "../../controllers/AuthController";

export default function validateJwtTokenMW(req, res, next) {
  try {
    // check if valid jwt
    validateJwtToken(req)
    next();

  } catch (err) {

    // invalid jwt
    return res.status(401).send({
      message: "Token error",
    });
  }
};
