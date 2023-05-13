import { Request, Response } from "express";

export function someHandler(req: Request, res: Response) {
    const data = { message: "Hello, from handler" };
    res.json(data);
}