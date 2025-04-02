const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Ім'я користувача обов'язкове"),
    body("email").isEmail().withMessage("Некоректний email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Пароль має бути мінімум 6 символів"),
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Некоректний email"),
    body("password").notEmpty().withMessage("Пароль обов'язковий"),
  ],
  authController.login
);

module.exports = router;
