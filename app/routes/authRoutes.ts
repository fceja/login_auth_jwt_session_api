import express, { Router } from "express";

import { loginAuth } from "../middleware/loginAuth";

const router = express.Router();

// POST
router.post("/login", loginAuth);

export default router;