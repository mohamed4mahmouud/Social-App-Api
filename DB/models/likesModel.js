import mongoose from "mongoose";

const likesSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },

    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const likesModel = mongoose.model("Like", likesSchema);

export default likesModel;
