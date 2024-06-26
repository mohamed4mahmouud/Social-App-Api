import commentModel from "../../DB/models/commentModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../../utils/ApiError.js";

// @desc get all comments on post
// @route /api/v1/post/postId/comment
// @access public
export const getAllComments = asyncHandler(async (req, res, next) => {
  const limit = req.query.limit || 5;
  const { postId } = req.params;
  const comments = await commentModel.find({ post: postId }).limit(5);

  if (!comments.length) {
    return next(new ApiError("No comments for this post", 404));
  }

  res
    .status(200)
    .json({ message: "success", result: comments.length, data: comments });
});

// @desc get comment
// @route /api/v1/comment/commentId
// @access public
export const getComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const comment = await commentModel.findById(id);

  if (!comment) {
    return next(new ApiError("No comment found", 404));
  }

  res.status(200).json({ message: "success", data: comment });
});

// @desc create comment
// @route /api/v1/post/postId/comment
// @access user
export const createComment = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;

  const newComment = await commentModel.create({
    content,
    user: req.user.id,
    post: postId,
  });

  res.status(201).json({ message: "success", data: newComment });
});

// @desc update comment
// @route /api/v1/comment/commentId
// @access user
export const updateComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  const comment = await commentModel.findById(id);

  if (!comment) {
    return next(new ApiError("Comment not found", 404));
  }

  if (comment.user.toString() !== req.user.id) {
    return next(
      new ApiError("You are not allowed to perform this action", 401)
    );
  }

  comment.content = content;
  await comment.save();

  res.status(200).json({ message: "success", data: comment });
});

// @desc delete comment
// @route /api/v1/comment/commentId
// @access user
export const deleteComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const comment = await commentModel.findById(id);

  if (!comment) {
    return next(new ApiError("Comment not found", 404));
  }

  if (comment.user.toString() !== req.user.id) {
    return next(
      new ApiError("You are not allowed to perform this action", 401)
    );
  }

  await commentModel.findByIdAndDelete(id);
  res.status(204).json({ message: "success" });
});
