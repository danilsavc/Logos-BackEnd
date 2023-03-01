import jwt from "jsonwebtoken";

import { config } from "../config.js";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtToken.secretKey);

      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Немає доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Немає доступа",
    });
  }
};
