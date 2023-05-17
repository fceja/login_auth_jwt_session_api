import express from "express";

import { loginAuth } from "../middleware/auth/loginAuth";

const router = express.Router();

// POST
router.post("/login", loginAuth);

export default router;