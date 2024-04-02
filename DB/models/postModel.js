import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Post must have a content"],
    },

    images: [String],

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post must be belong to User"],
    },

    commentsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
