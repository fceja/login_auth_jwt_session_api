import express from "express";

import refreshJwtTokenMW from "../../middleware/auth/RefresJwtTokenMW";
import testHandler from "../../routes/test/TestHandler";
import validateJwtTokenMW from "../../middleware/auth/ValidateJwtTokenMW";

const testRouter = express.Router();

// #region - AUTH REQ
// GET /test
testRouter.get("/", [validateJwtTokenMW, refreshJwtTokenMW], testHandler);
// #endregion - AUTH REQ

export default testRouter;
