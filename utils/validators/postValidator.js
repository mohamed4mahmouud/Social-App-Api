import { check } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";

export const createPostValidator = [
  check("content")
    .notEmpty()
    .withMessage("Please provide a content")
    .isLength({ max: 500 })
    .withMessage("Post cannot exceed 500 characters"),

  check("images").optional().isArray(),
  validatorMiddleware,
];

export const checkIdValidator = [
  check("id").isMongoId().withMessage("Invalid post id format"),
  validatorMiddleware,
];

export const updatePostValidator = [
  check("id").isMongoId().withMessage("Invalid post id format"),

  check("content")
    .notEmpty()
    .withMessage("Please provide a content")
    .isLength({ max: 500 })
    .withMessage("Post cannot exceed 500 characters"),
  validatorMiddleware,
];
