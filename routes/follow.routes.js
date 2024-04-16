import { Router } from "express";
import * as followerController from "../Controllers/Follower/followerController.js";
import * as authController from "../Controllers/Auth/auth.js";

const router = Router();

router.put("/:userId", authController.protect, followerController.follow);
router.put(
  "/:userId/unfollow",
  authController.protect,
  followerController.unFollow
);

router.get(
  "/:userId/followers",
  authController.protect,
  followerController.getUserFollowers
);

router.get(
  "/:userId/following",
  authController.protect,
  followerController.getUserFollowing
);

export default router;
