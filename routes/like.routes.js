import { Router } from "express";
import * as likesController from "../Controllers/Likes/likesController.js";
import * as authController from "../Controllers/Auth/auth.js";

const router = Router({ mergeParams: true });

router.post("/", authController.protect, likesController.likePost);
export default router;
