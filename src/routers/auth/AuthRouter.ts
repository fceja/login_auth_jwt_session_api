import express from "express";

import loginAuthMW from "../../middleware/auth/LoginAuthMW";

const router = express.Router();

// #region - NO AUTH REQ
// POST
router.post("/login", loginAuthMW);
// #endregion - NO AUTH REQ

export default router;
