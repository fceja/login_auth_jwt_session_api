import express, { Router } from "express";

import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import testRouter from "./testRoutes";

const router: Router = express.Router();

router.use("/", (req, res) => {res.json({message:'index'})});
router.use("/test", testRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
