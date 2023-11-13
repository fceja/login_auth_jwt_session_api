import express from "express";

import * as userController from "@controllers/UserController";
import createUserMidW from "@middleware/user/CreateUserMidW";
import refreshJwtTokenMidW from "@middleware/auth/RefreshJwtTokenMidW";
import requireAdminMidW from "@middleware/auth/RequireAdminMidW";
import validateJwtTokenMidW from "@middleware/auth/ValidateJwtTokenMidW";

const usersRouter = express.Router();

// #region - AUTH REQ
// GET
usersRouter.get(
  "/getUser",
  [validateJwtTokenMidW, refreshJwtTokenMidW],
  userController.getUser
);
usersRouter.get(
  "/getUsers",
  [requireAdminMidW, validateJwtTokenMidW, refreshJwtTokenMidW],
  userController.getUsers
);
// #endregion - AUTH REQ

// #region - NO AUTH REQ
// POST
usersRouter.post("/create", createUserMidW);
// #endregion - NO AUTH REQ

export default usersRouter;
