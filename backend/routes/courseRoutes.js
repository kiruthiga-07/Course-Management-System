const express = require("express");
const {
    getCourses,
    getCourse,
    addCourse,
    editCourse,
    removeCourse
} = require("../controllers/courseController");
const validateCourse = require("../middleware/courseValidation");
const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", authenticateToken, authorizeRoles("admin"), validateCourse, addCourse);
router.put("/:id", authenticateToken, authorizeRoles("admin"), editCourse);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), removeCourse);

module.exports = router;