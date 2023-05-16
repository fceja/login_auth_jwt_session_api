import { Request, Response } from "express";

import User from "../models/User"
import UserController from "../controllers/UserController"

export async function loginUser (req: Request, res: Response) {
    const user = new User(req.body);
    const authd = await UserController.loginUser(user);

    if (!authd) {
        res.status(200).json({'message': 'Not authorized'})
    }
    else {
        res.status(200).json({'message': 'Authorized'})
    }
}