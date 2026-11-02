const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    enrollCourse,
    getMyCourses,
    unenrollCourse
} = require("../controllers/enrollmentController");

router.get(
    "/my-courses",
    authenticateToken,
    authorizeRoles("student"),
    getMyCourses
);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("student"),
    enrollCourse
);

router.delete(
    "/:courseId",
    authenticateToken,
    authorizeRoles("student"),
    unenrollCourse
);

module.exports = router;