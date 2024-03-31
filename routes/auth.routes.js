import { Router } from "express";
import * as authController from "../Controllers/Auth/auth.js";

const router = Router();

router.post("/signup", authController.signUp);

export default router;
