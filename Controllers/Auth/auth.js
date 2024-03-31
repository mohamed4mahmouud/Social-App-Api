import userModel from "../../DB/models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, userName, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = await userModel.create({
    name,
    email,
    userName,
    password: hashedPassword,
  });

  res.status(201).json({ message: "success", data: newUser });
});
