import userModel from "../../DB/models/userModel.js";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../../utils/sendEmail.js";
import ApiError from "../../utils/ApiError.js";
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

  const link = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`;
  const message = `please verify your email <a href="${link}">here </a>`;
  sendEmail(newUser.email, "Confirm Email", message);
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decode = Jwt.verify(token, process.env.SECRET_KEY);

  //check if token valid or not
  if (!decode) {
    return next(new ApiError("Invalid token", 400));
  }
  const user = await userModel.findOne({ _id: decode.id, confirmEmail: false });

  if (user) {
    user.confirmEmail = true;
    await user.save();
    res.status(200).json({ message: "success", data: user });
  } else {
    return next(new ApiError("You are already confirmed email", 400));
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

   //check if user exist or not
   if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  if (!user.confirmEmail) {
    return next(new ApiError("Please Confirm your email", 400));
  }

  const token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.status(200).json({ message: "success", accessToken: token });
});
