import { Request, Response } from "express";

import { getUsers } from "../../controllers/UserController";

export default async function getUsersMW(req: Request, res: Response) {
  try {
    const users = await getUsers();

    res.status(200).json({ "from GET /user/getUsers": users });

  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
}
