import express from "express";

import refreshJwtTokenMW from "../../middleware/auth/RefresJwtTokenMW";
import validateJwtTokenMW from "../../middleware/auth/ValidateJwtTokenMW";
import someHandlerMW from "../../middleware/test/TestHandlerMW";

const testRouter = express.Router();

// #region - AUTH REQ
// GET
testRouter.get("/", [validateJwtTokenMW, refreshJwtTokenMW], someHandlerMW);
// #endregion - AUTH REQ

export default testRouter;
