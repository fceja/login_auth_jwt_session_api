import User from "../../models/User"
import { getSessionToken } from "../../controllers/AuthController"

export default function refreshJwtTokenMW(req, res, next){
    let user = new User(req.body);
    req.session.token = getSessionToken(req, user);

    next();
}