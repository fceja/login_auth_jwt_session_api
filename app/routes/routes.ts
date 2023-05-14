import express, { Router } from "express";
import { getUsers } from "../middleware/getUsers";
import { someHandler } from "../middleware/handlers";

const router: Router = express.Router();

router.get('/', someHandler)
router.get('/users', getUsers)

export default router;
