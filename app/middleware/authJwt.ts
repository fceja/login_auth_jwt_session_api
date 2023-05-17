const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");

const verifyToken = (req, res, next) => {
  const token = req.session.token;

  if (!token) {

    return res.status(403).send({
      message: "Token error",
    });
  } else {
    try {
      jwt.verify(token, authConfig.secret);

      return res.status(200).send({
        message: "Token valid",
      });
    } catch (err) {

      return res.status(401).send({
        message: "Token expired",
      });
    }
  }
};

const authJwtMiddleware = {
  verifyToken,
};
export default authJwtMiddleware;
