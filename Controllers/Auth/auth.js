import userModel from "../../DB/models/userModel.js";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../../utils/sendEmail.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, userName, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    email,
    userName,
    password: hashedPassword,
  });

  res.status(201).json({ message: "success", data: newUser });

  const token = Jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  const link = `${req.protocol}://${req.headers.host}/api/v1/user/confirmEmail/${token}`;
  const message = `please verify your email <a href="${link}">here </a>`;
  sendEmail(newUser.email, "Confirm Email", message);
});
