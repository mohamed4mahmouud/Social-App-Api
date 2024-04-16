import userModel from "../../DB/models/userModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../../utils/ApiError.js";

// @desc Follow users
// @route /api/v1/follow/userId
// @method put
// @access logged user
export const follow = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const userFollower = await userModel.findByIdAndUpdate(
    userId,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  );

  if (!userFollower) {
    return next(new ApiError("User not found", 404));
  }

  const userFollowing = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $push: { following: userId },
    },
    { new: true }
  );
  res.status(200).json({ message: "Successfully followed user." });
});

// @desc UnFollow users
// @route /api/v1/follow/userId/unfollow
// @method put
// @access logged user
export const unFollow = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const userFollower = await userModel.findByIdAndUpdate(
    userId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  );

  if (!userFollower) {
    return next(new ApiError("User not found", 404));
  }

  const userFollowing = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { following: userId },
    },
    { new: true }
  );
  res.status(200).json({ message: "Successfully unFollowed user." });
});

// @desc List User Followers
// @route /api/v1/follow/userId/followers
// @method get
// @access logged user
export const getUserFollowers = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  // Find the user by ID and populate the followers field
  const user = await userModel
    .findById(userId)
    .populate("followers", "name -_id");
  const followers = user.followers;

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res
    .status(200)
    .json({ message: "success", data: followers, count: followers.length });
});

// @desc List User Following
// @route /api/v1/follow/userId/following
// @method get
// @access logged user
export const getUserFollowing = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  // Find the user by ID and populate the following field
  const user = await userModel
    .findById(userId)
    .populate("following", "name -_id");
  const following = user.following;

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res
    .status(200)
    .json({ message: "success", data: following, count: following.length });
});
