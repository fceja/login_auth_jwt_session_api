import express from "express";

import * as testController from "@controllers/TestController";
import refreshJwtTokenMidW from "@middleware/auth/RefreshJwtTokenMidWare";
import validateJwtTokenMidW from "@middleware/auth/ValidateJwtTokenMidWare";

const testRouter = express.Router();

// #region - AUTH REQ
// GET /test
testRouter.get(
  "/",
  [validateJwtTokenMidW, refreshJwtTokenMidW],
  testController.getTestHandler
);
// #endregion - AUTH REQ

export default testRouter;
