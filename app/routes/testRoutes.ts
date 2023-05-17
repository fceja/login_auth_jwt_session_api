import express from "express";

import { someHandler } from "../middleware/test/testHandler";

const testRouter = express.Router();

// GET
testRouter.get("/", someHandler);

export default testRouter;
