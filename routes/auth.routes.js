import { Router } from "express";
import * as authController from "../Controllers/Auth/auth.js";

const router = Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/confirmEmail/:token", authController.confirmEmail);

export default router;
