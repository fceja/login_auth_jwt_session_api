import express from "express";

import { createUser } from "../middleware/createUser";
import { getUsers } from "../middleware/getUsers";
import { loginUser } from "../middleware/loginUser";

const usersRouter = express.Router();

// GET
usersRouter.get("/getUsers", getUsers);

// POST
usersRouter.post("/create", createUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
