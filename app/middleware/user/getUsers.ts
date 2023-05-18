import { Request, Response } from "express";

import dbPool from "../../utils/dbInit";

export async function getUsers(req: Request, res: Response) {
  try {
    // init db connection
    const dbConn = await dbPool.connect();

    // excecute query
    const data = await dbConn.query('select * from _user');
    res.json({ "from GET /user/getUsers": data.rows });

    // end db connection
    dbConn.end();
  } catch (err) {
    // error
    console.error(`Error: ${err}`);
    res.status(500);
  }
}
