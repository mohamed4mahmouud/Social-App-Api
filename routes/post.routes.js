import { Router } from "express";
import * as postController from "../Controllers/Post/post.js";
import * as authController from "../Controllers/Auth/auth.js";
import commentRouter from "./comment.routes.js";
import likeRouter from "./like.routes.js";
import { uploadImages } from "../utils/multer.js";
import {
  createPostValidator,
  updatePostValidator,
  checkIdValidator,
} from "../utils/validators/postValidator.js";

const router = Router();

router.use("/:postId/comment", commentRouter);
router.use("/:postId/like", likeRouter);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    authController.protect,
    uploadImages,
    createPostValidator,
    postController.createPost
  );

router
  .route("/:id")
  .get(checkIdValidator, postController.getPost)
  .put(
    authController.protect,
    uploadImages,
    updatePostValidator,
    postController.updatePost
  )
  .delete(authController.protect, checkIdValidator, postController.deletePost);

export default router;
