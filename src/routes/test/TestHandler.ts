import { Request, Response } from "express";

export default function testHandler(_req: Request, res: Response) {
  return res.send({
    message: `from - /src/routes/test/TestHandler.ts`,
  });
}
