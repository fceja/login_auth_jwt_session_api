import { Response } from "express";

export default function someHandlerMW(res: Response) {
  return res.send({ message: "Hello, from someHandler" });
}
