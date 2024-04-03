import { Router } from "express";
import * as userController from "../Controllers/User/userController.js";
import * as authController from "../Controllers/Auth/auth.js";

const router = Router();

router.route("/").get(userController.getAllUsers);

router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
