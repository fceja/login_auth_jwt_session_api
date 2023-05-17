import express from "express";

import { createUser } from "../middleware/user/createUser";
import { getUsers } from "../middleware/user/getUsers";

const usersRouter = express.Router();

// GET
usersRouter.get("/getUsers", getUsers);

// POST
usersRouter.post("/create", createUser);

export default usersRouter;
