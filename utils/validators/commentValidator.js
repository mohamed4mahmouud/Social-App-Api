import { check } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";

export const createCommentValidator = [
  check("content")
    .notEmpty()
    .withMessage("Please provide a comment")
    .isLength({ max: 500 })
    .withMessage("Comment cannot exceed 500 characters"),

  check("postId").isMongoId().withMessage("Invalid post id format"),
  validatorMiddleware,
];

export const updateCommentValidator = [
  check("content")
    .notEmpty()
    .withMessage("Please provide a comment")
    .isLength({ max: 500 })
    .withMessage("Comment cannot exceed 500 characters"),

  check("id").isMongoId().withMessage("Invalid post id format"),
  validatorMiddleware,
];

export const checkIdValidator = [
    check("id").isMongoId().withMessage("Invalid post id format"),
    validatorMiddleware,
  ];