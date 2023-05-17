const jwt = require("jsonwebtoken");
const authConfig = require("../../config/authConfig");

export default function validateJwtToken(req, res, next) {
  try {
    // check if valid jwt
    jwt.verify(req.session.token, authConfig.secret);

    // jwt is valid
    next();

  } catch (err) {

    // invalid jwt
    return res.status(401).send({
      message: "Token error",
    });
  }
};
