const { body } = require("express-validator");

const registerValidation = [
    body("name")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email is required")
        .normalizeEmail({ gmail_remove_dots: false }),

    body("password")
        .isString()
        .isLength({ min: 12, max: 72 })
        .withMessage("Password must contain 12 to 72 characters")
];

const loginValidation = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isString().notEmpty().withMessage("Password is required")
];

module.exports = {
    registerValidation,
    loginValidation
};