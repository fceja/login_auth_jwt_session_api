import express, { Response } from "express";

import userRouter from "./UserRoutes";
import authRouter from "./AuthRoutes";
import testRouter from "./TestRoutes";

// init
const router = express.Router();

// routes
router.get("/", (res: Response) => {
  res.json({ message: "public - index" });
});
router.use("/test", testRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
