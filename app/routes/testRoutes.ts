import express from "express";

import { midWare } from "../middleware";

const testRouter = express.Router();

// GET
testRouter.get(
  "/",
  [midWare.authValidateJwtToken, midWare.authRefreshJwtToken],
  midWare.testSomeHandler
);

export default testRouter;
