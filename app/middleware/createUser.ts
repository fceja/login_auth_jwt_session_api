import { Request, Response } from "express";

import dbPool from "../utils/dbInit";

// TODO: hash password
export async function createUser(req: Request, res: Response) {
  try {
    // init db connection
    const dbConn = await dbPool.connect();

    // query vars
    const { email, password } = req.body;
    const now = new Date().toISOString();

    // query db
    const query = await dbConn.query(
      ` insert into "Users" (email, password, "createdAt", "lastUpdated")
        values ($1, $2, $3, $4)
        on conflict (email) do nothing
        returning id, email, "createdAt", "lastUpdated"
      `,
      [email, password, now, now]
    );

    // return query result
    if (query.rowCount === 0) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.json({ result: query.rows });
    }

    // end db connection
    dbConn.end();
  } catch (err) {
    // error
    console.error(`Error: ${err}`);
    res.status(500);
  }
}
