import express from "express";

import createUserMidW from "@middleware/user/CreateUserMidW";
import getUserMidW from "@middleware/user/GetUserMidW";
import getUsersMidW from "@middleware/user/GetUsersMidW";
import refreshJwtTokenMidW from "@middleware/auth/RefreshJwtTokenMidW";
import requireAdminMidW from "@middleware/auth/RequireAdminMidW";
import validateJwtTokenMidW from "@middleware/auth/ValidateJwtTokenMidW";

const usersRouter = express.Router();

// #region - AUTH REQ
// GET
usersRouter.get(
  "/getUser",
  [validateJwtTokenMidW, refreshJwtTokenMidW],
  getUserMidW
);
usersRouter.get(
  "/getUsers",
  [requireAdminMidW, validateJwtTokenMidW, refreshJwtTokenMidW],
  getUsersMidW
);
// #endregion - AUTH REQ

// #region - NO AUTH REQ
// POST
usersRouter.post("/create", createUserMidW);
// #endregion - NO AUTH REQ

export default usersRouter;
