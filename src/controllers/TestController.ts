import { Request, Response } from "express";

export const getTestHandler = (_req: Request, res: Response) => {
  return res.send({
    message: `from - /src/routes/test/GetTestHandler.ts`,
  });
};
