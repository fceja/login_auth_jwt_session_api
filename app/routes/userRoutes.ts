import express from "express";

import { createUser } from "../middleware/user/createUser";
import { getUsers } from "../middleware/user/getUsers";
import { midWare } from "../middleware";

const usersRouter = express.Router();

//#region - AUTH REQ
// GET
usersRouter.get("/getUsers", [midWare.performAuthFuncs], getUsers);
//#endregion - AUTH REQ

//#region - NO AUTH REQ
// POST
usersRouter.post("/create", createUser);
//#endregion - NO AUTH REQ

export default usersRouter;
