const express = require("express");
const {
    getEnrollments,
    getEnrollment,
    addEnrollment,
    editEnrollment,
    removeEnrollment
} = require("../controllers/enrollmentController");

const router = express.Router();

router.get("/", getEnrollments);
router.get("/:id", getEnrollment);
router.post("/", addEnrollment);
router.put("/:id", editEnrollment);
router.patch("/:id", editEnrollment);
router.delete("/:id", removeEnrollment);

module.exports = router;