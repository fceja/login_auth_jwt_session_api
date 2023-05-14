import express, { Router } from "express";

import { someHandler } from "../middleware/handlers";
import userRouter from "./user";

const router: Router = express.Router();

router.get("/", someHandler);
router.use("/user", userRouter);

export default router;
