import express from "express";

import createUserMW from "@middleware/user/CreateUserMW";
import getUserMW from "@middleware/user/GetUserMW";
import getUsersMW from "@middleware/user/GetUsersMW";
import refreshJwtTokenMW from "@middleware/auth/RefreshJwtTokenMW";
import requireAdminMW from "@middleware/auth/RequireAdminMW";
import validateJwtTokenMW from "@middleware/auth/ValidateJwtTokenMW";

const usersRouter = express.Router();

// #region - AUTH REQ
// GET
usersRouter.get("/getUser", [validateJwtTokenMW, refreshJwtTokenMW], getUserMW);
usersRouter.get(
  "/getUsers",
  [requireAdminMW, validateJwtTokenMW, refreshJwtTokenMW],
  getUsersMW
);
// #endregion - AUTH REQ

// #region - NO AUTH REQ
// POST
usersRouter.post("/create", createUserMW);
// #endregion - NO AUTH REQ

export default usersRouter;
