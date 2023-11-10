import express from "express";

import * as testController from "@controllers/TestController";
import refreshJwtTokenMW from "@middleware/auth/RefreshJwtTokenMW";
import validateJwtTokenMW from "@middleware/auth/ValidateJwtTokenMW";

const testRouter = express.Router();

// #region - AUTH REQ
// GET /test
testRouter.get(
  "/",
  [validateJwtTokenMW, refreshJwtTokenMW],
  testController.getTestHandler
);
// #endregion - AUTH REQ

export default testRouter;
