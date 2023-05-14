import { Request, Response} from "express";
import dbPool from "../utils/dbInit";

export async function getUsers (req: Request, res: Response) {
    const dbConn = await dbPool.connect()

    try {
        const data = await dbConn.query('select * from "Users"')
        res.json({"users": data.rows})

    } catch (err) {
        console.error(`Error: ${err}`)

    } finally {
        dbConn.end();
    }
}
