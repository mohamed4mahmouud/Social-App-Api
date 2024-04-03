import multer from "multer";
import ApiError from "./ApiError.js";

const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only images allowed", 400), false);
  }
}

export const uploadImages = multer({ storage, fileFilter }).array("images");
