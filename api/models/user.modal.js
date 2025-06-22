import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/736x/25/19/9d/25199d7fd3c53127dde6ad8806f44773.jpg",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
