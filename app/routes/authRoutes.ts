import express from "express";

import { midWare } from "../middleware";

const router = express.Router();

//#region - NO AUTH REQ
// POST
router.post("/login", midWare.authLoginAuth);
//#endregion - NO AUTH REQ

export default router;