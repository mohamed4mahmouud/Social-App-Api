import userModel from "../../DB/models/userModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../../utils/ApiError.js";

// @desc get all users
// @route /api/v1/user
// @access public
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({ active: true });

  res
    .status(200)
    .json({ message: "success", result: users.length, data: users });
});

// @desc get auth user
// @route /api/v1/user/getMe
// @access user
export const getMe = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc get user
// @route /api/v1/user/userId
// @access admin
export const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({ message: "success", data: user });
});

// @desc update auth user
// @method put
// @route /api/v1/user/updateprofile
// @access user
export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.user.id;
  const { name, userName, email } = req.body;

  if (req.body.password) {
    return next(new ApiError("This route not for change password", 400));
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { name, userName, email },
    {
      new: true,
    }
  );

  if (!updatedUser) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({ message: "success", data: updatedUser });
});

// @desc delete user
// @method delete
// @route /api/v1/user/userId
// @access admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findByIdAndDelete(id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(204).json({ message: "success", data: null });
});

// @desc delete auth user
// @method delete
// @route /api/v1/user/deleteMe
// @access user
export const deleteMe = asyncHandler(async (req, res, next) => {
  const { id } = req.user.id;

  const user = await userModel.findByIdAndUpdate(id, { active: false });

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({ message: "success", data: user });
});
