import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment must have a content"],
      max: [500, "Comment cannot exceed 500 characters"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must be belong to User"],
    },

    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Post must be belong to User"],
    },
    likesCount: Number,
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
