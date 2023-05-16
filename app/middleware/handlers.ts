import { Request, Response } from "express";

const { authJwt } = require("../middleware");

export function someHandler(req: Request, res: Response) {
  const tokenResp = authJwt.default.verifyToken(req, res);
  if (tokenResp.statusCode !== 200) {

    return tokenResp;
  }

  const data = { message: "Hello, from handler" };

  res.json(data);
}
