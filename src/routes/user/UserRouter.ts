import express from "express";

import createUserMidW from "@middleware/user/CreateUserMidWare";
import getUserMidW from "@middleware/user/GetUserMidWare";
import getUsersMidW from "@middleware/user/GetUsersMidWare";
import refreshJwtTokenMidW from "@middleware/auth/RefreshJwtTokenMidWare";
import requireAdminMidW from "@middleware/auth/RequireAdminMidWare";
import validateJwtTokenMidW from "@middleware/auth/ValidateJwtTokenMidWare";

const usersRouter = express.Router();

// #region - AUTH REQ
// GET
usersRouter.get("/getUser", [validateJwtTokenMidW, refreshJwtTokenMidW], getUserMidW);
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
