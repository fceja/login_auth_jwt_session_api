import { Request, Response } from "express";

const getTestHandler = (_req: Request, res: Response) => {
  return res.send({
    message: `from - /src/routes/test/GetTestHandler.ts`,
  });
};
export default getTestHandler;
