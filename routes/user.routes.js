import { Router } from "express";
import * as userController from "../Controllers/User/userController.js";
import * as authController from "../Controllers/Auth/auth.js";
import {
  updateUserValidator,
  userIdValidator,
} from "../utils/validators/userValidators.js";
const router = Router();

router.route("/").get(userController.getAllUsers);

router.use(authController.protect);

router.put(
  "/updateprofile",
  authController.restrictTo("user"),
  updateUserValidator,
  userController.updateUser
);
router.get(
  "/getMe",
  authController.restrictTo("user"),
  userController.getMe,
  userController.getUser
);
router.delete(
  "/deleteMe",
  authController.restrictTo("user"),
  userController.deleteMe
);

router.use(authController.restrictTo("admin"));
router
  .route("/:id")
  .get(userIdValidator, userController.getUser)
  .delete(userIdValidator, userController.deleteUser);

export default router;
