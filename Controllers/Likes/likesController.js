import likesModel from "../../DB/models/likesModel.js";
import asyncHandler from "express-async-handler";
import postModel from "../../DB/models/postModel.js";

// @desc like posts
// @route /api/v1/post/postId/like
// @method post
// @access logged user
export const likePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const like = await likesModel.findOne({ userId: req.user._id, postId });
  const post = await postModel.findById(postId);

  // Check if the user has already liked the post
  if (like) {
    // If user has already liked the post, unlike it
    await likesModel.findByIdAndDelete(like._id);

    // Update likes count for the post
    post.likesCount--;
    await post.save();
    return res.status(200).json({ message: "success" });
  }

  // If user hasn't liked the post, like it
  const newLike = await likesModel.create({ postId, userId: req.user._id });

  // Update likes count for the post
  post.likesCount++;
  await post.save();

  res.status(201).json({ message: "success", data: newLike });
});
