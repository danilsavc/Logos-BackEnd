import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неправильний формат пошти").isEmail(),
  body("password", "Пароль повинен містити мінімум 4 символів").isLength({ min: 4 }),
];

export const registerValidation = [
  body("email", "Неправильний формат пошти").isEmail(),
  body("password", "Пароль повинен містити мінімум 5 символів").isLength({ min: 5 }),
  body("firstName", "Ім'я повинно містити мінімум 3 букви").isLength({ min: 3 }),
  body("lastName", "Прізвище повинно містити мінімум 3 букви").isLength({ min: 3 }),
  body("phone", "Неправильний формат номера телефона").isLength({ min: 10, max: 10 }),
];

export const itemCreateValidation = [
  body("title", "Назва блюда повина містити мінімум 3 букви").isLength({ min: 3 }),
  body("text", "Опис блюда повинен містити мінімум 3 букви").isLength({ min: 3 }),
  body("price", "Введіть коректну ціну блюда").isLength({ min: 1 }),
  body("weight", "Введіть коректну вагу блюда").isLength({ min: 1 }),
  body("imgUrl", "Неправильне посилання на фото").isURL(),
];

export const orderValidation = [
  body("delivery", "Спосіб доставки повинен містити мінімум 3 букви").isLength({ min: 3 }),
  body("pay", "Pay повинно бути більше нуля").isInt({ min: 1 }),
  body("paid", "Paid повинно містити мінімум 3 букви").isLength({ min: 3 }),
  body("deliveryTime", "deliveryTime повинно містити мінімум 3 букви").isLength({ min: 3 }),
  body("amountPers", "amountPers повинно бути більше нуля").isInt({ min: 1 }),
  body("call", "call повиннен містити true or false").isBoolean(),
  body("item", "item це масив").isArray(),
];
