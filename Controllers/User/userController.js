import userModel from "../../DB/models/userModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../../utils/ApiError.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({});

  res
    .status(200)
    .json({ message: "success", result: users.length, data: users });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({ message: "success", data: user });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedUser) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({ message: "success", data: updatedUser });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findByIdAndDelete(id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(204).json({ message: "success", data: null });
});
