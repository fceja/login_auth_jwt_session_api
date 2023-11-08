import User from "../../models/User";
import { getSessionToken } from "../../controllers/AuthController";

export default function refreshJwtTokenMW(req, res, next) {
  req.session.token = getSessionToken(
    req,
    req.session.email,
    req.session.userId
  );

  next();
}
