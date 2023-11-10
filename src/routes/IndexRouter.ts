import express, { Request, Response } from "express";

import userRouter from "@routes/user/UserRoutes";
import authRouter from "@routes/auth/AuthRoutes";
import testRouter from "@routes/test/TestRoutes";

// init
const indexRouter = express.Router();

// routes
indexRouter.get("/", (_req: Request, res: Response) => {
  res.send({ message: "public - index" });
});

indexRouter.use("/auth", authRouter);
indexRouter.use("/test", testRouter);
indexRouter.use("/user", userRouter);

export default indexRouter;
