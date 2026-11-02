const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const controller = require("../controllers/studentController");

router.use(authenticateToken);
router.use(authorizeRoles("admin"));

router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);
router.post("/", controller.createStudent);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;