import express from "express";

import getTestHandler from "@routes/test/GetTestHandler";
import refreshJwtTokenMW from "@/src/middleware/auth/RefreshJwtTokenMW";
import validateJwtTokenMW from "@middleware/auth/ValidateJwtTokenMW";

const testRouter = express.Router();

// #region - AUTH REQ
// GET /test
testRouter.get("/", [validateJwtTokenMW, refreshJwtTokenMW], getTestHandler);
// #endregion - AUTH REQ

export default testRouter;
