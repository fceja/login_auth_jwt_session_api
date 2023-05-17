import express from "express";

import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import testRouter from "./testRoutes";

// init
const router = express.Router();

// routes
router.get("/", (req, res) => {res.json({ message: "public - index" });});
router.use("/test", testRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
