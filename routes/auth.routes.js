import { Router } from "express";
import * as authController from "../Controllers/Auth/auth.js";
import {
  signUpValidator,
  loginValidator,
  changePasswordValidator
} from "../utils/validators/authValidator.js";

const router = Router();

router.post("/signup", signUpValidator, authController.signUp);
router.post("/login", loginValidator, authController.login);
router.get("/confirmEmail/:token", authController.confirmEmail);
router.put(
  "/changePassword",
  authController.protect,
  authController.restrictTo("user"),
  changePasswordValidator,
  authController.changePassword
);

export default router;
