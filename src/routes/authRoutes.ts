import express from "express";

import { midW } from "../middleware";

const router = express.Router();

//#region - NO AUTH REQ
// POST
router.post("/login", midW.authLoginAuth);
//#endregion - NO AUTH REQ

export default router;