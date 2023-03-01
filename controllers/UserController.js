import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";
import { config } from "../config.js";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Неправильний логін або пароль",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неправильний логін або пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.jwtToken.secretKey,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: "Не вдалось авторизуватися",
    });
  }
};

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      passwordHash: hash,
      role: req.body.role,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        phone: user.phone,
      },
      config.jwtToken.secretKey,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Не вдалось зареєструватися",
    });
  }
};

export const aboutMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Користувача не знайдено",
      });
    }

    const data = user._doc;

    res.json(data);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Немає доступа",
    });
  }
};
