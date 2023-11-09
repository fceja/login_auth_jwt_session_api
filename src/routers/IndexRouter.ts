import express, { Request, Response } from "express";

import userRouter from "./user/UserRouter";
import authRouter from "./auth/AuthRouter";
import testRouter from "./test/TestRouter";

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
