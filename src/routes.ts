import express, { Router } from "express";
import { someHandler } from "./handlers";

const router: Router = express.Router();

router.get('/', someHandler)

export default router;
