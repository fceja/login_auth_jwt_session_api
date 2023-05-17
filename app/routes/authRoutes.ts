import express from "express";

import { loginAuth } from "../middleware/auth/loginAuth";

const router = express.Router();

//#region - NO AUTH REQ
// POST
router.post("/login", loginAuth);
//#endregion - NO AUTH REQ

export default router;