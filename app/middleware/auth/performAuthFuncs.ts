import validateJwtToken  from "./validateJwtToken";

export default function performAuthFuncs (req, res, next) {

  // todo add token refresh
  validateJwtToken(req, res, next);
};
