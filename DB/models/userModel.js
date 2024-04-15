import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      min: [3, "Too short name"],
      max: [25, "Too long name"],
    },

    userName: {
      type: String,
      required: [true, "User must have a username"],
      unique: [true, "Username must be unique"],
      min: [5, "Too short username"],
      max: [25, "Too long username"],
    },

    email: {
      type: String,
      required: [true, "User must have a email"],
      unique: [true, "Email must be unique"],
    },

    active: {
      type: Boolean,
      default: true,
    },

    image: String,

    password: {
      type: String,
      required: [true, "User must have a password"],
      minLength: [8, "Too Short password"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      lowercase: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
