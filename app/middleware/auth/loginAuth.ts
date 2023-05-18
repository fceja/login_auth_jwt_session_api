import User from "../../models/User"
import { loginAuth } from "../../controllers/AuthController";

export async function loginAuthMid (req, res) {
    const user = new User(req.body);
    const authd = await loginAuth(user, req, res);

    if (!authd) {
        res.status(200).json({'message': 'Not authorized'})
    }
    else {
        res.status(200).json({'message': 'Authorized'})
    }
}