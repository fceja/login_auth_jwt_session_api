import express from "express";

import { midW } from "../middleware/Index";

const usersRouter = express.Router();

//#region - AUTH REQ
// GET
usersRouter.get(
  "/getUsers",
  [midW.authRequireAdmin, midW.authValidateJwtToken, midW.authRefreshJwtToken],
  midW.userGetUsers
);

usersRouter.get(
  "/getUser",
  [midW.authValidateJwtToken, midW.authRefreshJwtToken],
  midW.userGetUser
);
//#endregion - AUTH REQ

//#region - NO AUTH REQ
// POST
usersRouter.post("/create", midW.userCreateUser);
//#endregion - NO AUTH REQ

export default usersRouter;
