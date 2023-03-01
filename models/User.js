import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: Number,
      require: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
