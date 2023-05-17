import express from "express";

import { midWare } from "../middleware";

const usersRouter = express.Router();

//#region - AUTH REQ
// GET
usersRouter.get(
  "/getUsers",
  [midWare.authValidateJwtToken, midWare.authRefreshJwtToken],
  midWare.userGetUsers
);
//#endregion - AUTH REQ

//#region - NO AUTH REQ
// POST
usersRouter.post("/create", midWare.userCreateUser);
//#endregion - NO AUTH REQ

export default usersRouter;
