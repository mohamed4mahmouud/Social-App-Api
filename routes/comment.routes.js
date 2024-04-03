import { Router } from "express";
import * as commentController from "../Controllers/Comment/commentController.js";
import * as authController from "../Controllers/Auth/auth.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(commentController.getAllComments)
  .post(authController.protect, commentController.createComment);

router
  .route("/:id")
  .get(authController.protect, commentController.getComment)
  .put(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

export default router;
