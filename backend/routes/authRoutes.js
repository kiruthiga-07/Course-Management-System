const express = require("express");
const authController = require("../controllers/authController");
const {
    validateRegistration,
    validateLogin,
    validatePasswordReset
} = require("../middleware/authValidation");
const {
    registerValidation,
    loginValidation
} = require("../validators/authValidators");
const validateRequest = require("../middleware/validateRequest");
const loginLimiter = require("../middleware/loginLimiter");

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validateRequest,
    validateRegistration,
    authController.register
);

router.post(
    "/login",
    loginLimiter,
    loginValidation,
    validateRequest,
    validateLogin,
    authController.login
);

router.post("/reset-password", validatePasswordReset, authController.resetPassword);

module.exports = router;