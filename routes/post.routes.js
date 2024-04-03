import { Router } from "express";
import * as postController from "../Controllers/Post/post.js";
import * as authController from "../Controllers/Auth/auth.js";
import commentRouter from "./comment.routes.js";
import {
  createPostValidator,
  updatePostValidator,
  checkIdValidator,
} from "../utils/validators/postValidator.js";

const router = Router();

router.use("/:postId/comment", commentRouter);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(createPostValidator, authController.protect, postController.createPost);

router
  .route("/:id")
  .get(checkIdValidator, postController.getPost)
  .put(updatePostValidator, authController.protect, postController.updatePost)
  .delete(checkIdValidator, authController.protect, postController.deletePost);

export default router;
