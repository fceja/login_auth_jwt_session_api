import express from "express";

import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import testRouter from "./testRoutes";
import validateJwt from "../middleware/validateJwt";

// init
const router = express.Router();

// routes
router.get("/", (req, res) => {res.json({message:'index'})});
router.use("/test", [validateJwt], testRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
