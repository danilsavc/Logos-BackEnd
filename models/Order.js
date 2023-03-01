import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    delivery: {
      type: String,
      require: true,
    },
    adress: {
      type: String,
    },
    pay: {
      type: Number,
      require: true,
    },
    paid: {
      type: String,
      require: true,
    },
    deliveryTime: {
      type: String,
      require: true,
    },
    amountPers: {
      type: Number,
      require: true,
    },
    call: {
      type: String,
      require: true,
    },
    item: {
      type: Array,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    phone: {
      require: true,
      type: String,
    },
    numberOrder: {
      require: true,
      type: Number,
      default: "10",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
