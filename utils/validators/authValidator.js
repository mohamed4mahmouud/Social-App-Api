import { check } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";
import userModel from "../../DB/models/userModel.js";

export const signUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("Please provide your name")
    .isLength({ min: 3 })
    .withMessage("Your name must be at least 3 characters long")
    .isLength({ max: 25 })
    .withMessage("Your name cannot exceed 25 characters"),

  check("userName")
    .notEmpty()
    .withMessage("Please provide username")
    .isLength({ min: 5 })
    .withMessage("Your username must be at least 5 characters long")
    .isLength({ max: 25 })
    .withMessage("Your username cannot exceed 25 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ userName: value });
      if (user) {
        throw new Error("Username already in-use");
      }
    }),

  check("email")
    .notEmpty()
    .withMessage("Please provide your email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const user = await userModel.findOne({ email: value });

      if (user) {
        throw new Error("Email already in-use");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("Please provide a password")
    .isLength({ min: 8 })
    .withMessage("Your password must be at least 8 characters long"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      } else {
        return value;
      }
    }),
  validatorMiddleware,
];

export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Please provide your email")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password").notEmpty().withMessage("Please provide a password"),
  validatorMiddleware,
];

export const changePasswordValidator = [
  check("password")
    .notEmpty()
    .withMessage("Please enter your current password"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((val, { req }) => {
      if (val !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("newPassword").notEmpty().withMessage("Enter your new password"),

  validatorMiddleware,
];
