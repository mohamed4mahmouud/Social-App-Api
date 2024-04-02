import postModel from "../../DB/models/postModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../../utils/ApiError.js";

// @desc get all posts
// @route /api/v1/post
// @access public
export const getAllPosts = asyncHandler(async (req, res, next) => {
  const limit = req.query.limit || 5;
  const posts = await postModel
    .find({})
    .limit(limit)
    .select("-__v")
    .populate("createdBy");
  res.status(200).json({ message: "success", data: posts });
});

// @desc get post
// @route /api/v1/post/postId
// @access public
export const getPost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await postModel.findById(id);

  if (!post) {
    return next(new ApiError("No post found", 404));
  }

  res.status(200).json({ message: "success", data: post });
});

// @desc Create post
// @route /api/v1/post
// @access user
export const createPost = asyncHandler(async (req, res, next) => {
  const { content } = req.body;

  const newPost = await postModel.create({ content, createdBy: req.user._id });
  res.status(201).json({ message: "success", data: newPost });
});

// @desc Update post
// @route /api/v1/post/postId
// @access user
export const updatePost = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id } = req.params;

  const post = await postModel.findById(id);

  if (!post) {
    return next(new ApiError("Post not found", 404));
  }
  //console.log(post.createdBy.toString(), req.user.id);

  if (post.createdBy.toString() !== req.user.id) {
    return next(
      new ApiError("You are not allowed to perform this action", 401)
    );
  }

  post.content = content;
  await post.save();
  res.status(200).json({ message: "success", data: post });
});

// @desc Delete post
// @route /api/v1/post/postId
// @access user
export const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await postModel.findById(id);

  if (!post) {
    return next(new ApiError("Post not found", 404));
  }

  if (post.createdBy.toString() !== req.user.id) {
    return next(
      new ApiError("You are not allowed to perform this action", 401)
    );
  }
  await postModel.findByIdAndDelete(post._id);
  res.status(204).json({ message: "success" });
});
