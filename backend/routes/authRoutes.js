const express = require("express");
const authController = require("../controllers/authController");
const {
    validateRegistration,
    validateLogin,
    validatePasswordReset
} = require("../middleware/authValidation");

const router = express.Router();

router.post("/register", validateRegistration, authController.register);
router.post("/login", validateLogin, authController.login);
router.post("/reset-password", validatePasswordReset, authController.resetPassword);

module.exports = router;
