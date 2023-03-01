import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  loginValidation,
  registerValidation,
  itemCreateValidation,
  orderValidation,
} from "./validations.js";

import { UserController, ItemController, OrderController } from "./controllers/index.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";

mongoose
  .connect("mongodb+srv://admin:wwwwww@cluster0.w8noqaz.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB oK"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.aboutMe);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/items", ItemController.getAll);
app.get("/items/:id", ItemController.getOne);
app.get("/items/categoryId/:categoryId", ItemController.getAllbyCategory);
app.post("/items", checkAuth, itemCreateValidation, handleValidationErrors, ItemController.create);
app.delete("/items/:id", checkAuth, itemCreateValidation, ItemController.remove);
app.patch(
  "/items/:id",
  checkAuth,
  itemCreateValidation,
  handleValidationErrors,
  ItemController.update
);

app.post("/order", checkAuth, orderValidation, OrderController.orderCreate);
app.get("/order", checkAuth, OrderController.getAllOrder);
app.get("/order/:id", checkAuth, OrderController.getOneOrder);
app.delete("/order/:id", checkAuth, orderValidation, OrderController.removeOrder);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
