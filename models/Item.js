import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    category: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
    },
    weight: {
      type: Number,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    imgUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Item", ItemSchema);
