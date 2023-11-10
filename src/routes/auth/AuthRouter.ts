import express from "express";

import loginAuthMidW from "@middleware/auth/LoginAuthMidWare";

const authRouter = express.Router();

// #region - NO AUTH REQ
// POST
authRouter.post("/login", loginAuthMidW);
// #endregion - NO AUTH REQ

export default authRouter;
