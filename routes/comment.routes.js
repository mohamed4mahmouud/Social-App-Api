import { Router } from "express";
import * as commentController from "../Controllers/Comment/commentController.js";
import * as authController from "../Controllers/Auth/auth.js";
import {
  createCommentValidator,
  updateCommentValidator,
  checkIdValidator,
} from "../utils/validators/commentValidator.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(commentController.getAllComments)
  .post(
    authController.protect,
    createCommentValidator,
    commentController.createComment
  );

router
  .route("/:id")
  .get(authController.protect, checkIdValidator, commentController.getComment)
  .put(
    authController.protect,
    updateCommentValidator,
    commentController.updateComment
  )
  .delete(
    authController.protect,
    checkIdValidator,
    commentController.deleteComment
  );

export default router;
