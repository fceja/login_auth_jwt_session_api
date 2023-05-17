import express from "express";

import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import testRouter from "./testRoutes";
import { midWare } from "../middleware";

// init
const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.json({ message: "public - index" });
});
router.use(
  "/test",
  [midWare.validateJwtToken, midWare.refreshJwtToken],
  testRouter
);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
