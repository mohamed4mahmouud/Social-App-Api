import { Router } from "express";
import * as postController from "../Controllers/Post/post.js";
import * as authController from "../Controllers/Auth/auth.js";

const router = Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router
  .route("/:id")
  .get(postController.getPost)
  .put(authController.protect, postController.updatePost)
  .delete(authController.protect, postController.deletePost);

export default router;
