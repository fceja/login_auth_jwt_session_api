import { Request, Response } from "express";

export default function someHandlerMW(_req: Request, res: Response) {
  return res.send({ message: "Hello, from someHandler" });
}
