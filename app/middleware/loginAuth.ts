import User from "../models/User"

const AuthController = require("../controllers/AuthController");

export async function loginAuth (req, res) {
    const user = new User(req.body);

    const authd = await AuthController.loginAuth(user, req, res);

    if (!authd) {
        res.status(200).json({'message': 'Not authorized'})
    }
    else {
        res.status(200).json({'message': 'Authorized'})
    }
}