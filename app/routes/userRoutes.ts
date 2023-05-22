import express from "express";

import { midW } from "../middleware";

const usersRouter = express.Router();

//#region - AUTH REQ
// GET
usersRouter.get(
  "/getUsers",
  [midW.authRequireAdmin, midW.authValidateJwtToken, midW.authRefreshJwtToken],
  midW.userGetUsers
);
//#endregion - AUTH REQ

//#region - NO AUTH REQ
// POST
usersRouter.post("/create", midW.userCreateUser);
//#endregion - NO AUTH REQ

export default usersRouter;
