import { check } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";
import userModel from "../../DB/models/userModel.js";

export const updateUserValidator = [
  check("email")
    .optional()
    .isEmail()
    .custom(async (value) => {
      const user = await userModel.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),

  check("userName")
    .optional()
    .custom(async (value) => {
      const user = await userModel.findOne({ userName: value });
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  validatorMiddleware,
];

export const userIdValidator = [
  check("id").isMongoId().withMessage("Invalid id"),
  validatorMiddleware,
];
