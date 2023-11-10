import express, { Request, Response } from "express";

import authRouter from "@routes/auth/AuthRouter";
import testRouter from "@routes/test/TestRouter";
import userRouter from "@routes/user/UserRouter";

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
