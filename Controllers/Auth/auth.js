import userModel from "../../DB/models/userModel.js";
import asyncHandler from "express-async-handler";


export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, userName, password } = req.body;
  
});
