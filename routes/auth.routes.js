import { Router } from "express";
import * as authController from "../Controllers/Auth/auth.js";
import {
  signUpValidator,
  loginValidator,
} from "../utils/validators/authValidator.js";

const router = Router();

router.post("/signup", signUpValidator, authController.signUp);
router.post("/login", loginValidator, authController.login);
router.get("/confirmEmail/:token", authController.confirmEmail);

export default router;
