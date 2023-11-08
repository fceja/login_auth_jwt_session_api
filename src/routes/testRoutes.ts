import express from "express";

import { midW } from "../middleware/Index";

const testRouter = express.Router();

//#region - AUTH REQ
// GET
testRouter.get(
  "/",
  [midW.authValidateJwtToken, midW.authRefreshJwtToken],
  midW.testSomeHandler
);
//#endregion - AUTH REQ

export default testRouter;
