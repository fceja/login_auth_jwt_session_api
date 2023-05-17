import express from "express";

import { createUser } from "../middleware/createUser";
import { getUsers } from "../middleware/getUsers";

const usersRouter = express.Router();

// GET
usersRouter.get("/getUsers", getUsers);

// POST
usersRouter.post("/create", createUser);

export default usersRouter;
