const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");

const validateToken = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    // jwt missing
    return res.status(403).send({
      message: "Token error",
    });
  } else {
    try {
      // check if valid jwt
      jwt.verify(token, authConfig.secret);

      // jwt is valid
      next();
    } catch (err) {

      // invalid jwt
      return res.status(401).send({
        message: "Token expired",
      });
    }
  }
};

const authJwtMiddleware = {
  validateToken: validateToken,
};
export default authJwtMiddleware;
