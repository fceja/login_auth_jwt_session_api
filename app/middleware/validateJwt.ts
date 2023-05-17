import { authJwt } from ".";

const validateJwt = (req, res, next) => {
  authJwt.validateToken(req, res, next);
};

export default validateJwt;
