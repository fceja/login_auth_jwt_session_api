import express from "express";

import loginAuthMidW from "@middleware/auth/LoginAuthMidW";

const authRouter = express.Router();

// #region - NO AUTH REQ
// POST /auth/login
authRouter.post("/login", loginAuthMidW);
// #endregion - NO AUTH REQ

export default authRouter;
