import { Request, Response} from "express";

import dbPool from "../utils/dbInit";

// TODO: update to create user in db
export async function createUser (req: Request, res: Response) {
    const dbConn = await dbPool.connect()

    try {
        const data = await dbConn.query('select * from "Users"')
        res.json({"from POST /user/create": data.rows})

    } catch (err) {
        console.error(`Error: ${err}`)

    } finally {
        dbConn.end();
    }
}
