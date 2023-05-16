import User from "../models/User"

const UserController = require("../controllers/UserController");

export async function loginUser (req, res) {
    const user = new User(req.body);

    const authd = await UserController.loginUserCtrl(user, req, res);

    if (!authd) {
        res.status(200).json({'message': 'Not authorized'})
    }
    else {
        res.status(200).json({'message': 'Authorized'})
    }
}