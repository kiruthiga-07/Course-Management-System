const express = require("express");
const {
    getStudents,
    getStudent,
    addStudent,
    editStudent,
    removeStudent
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", addStudent);
router.put("/:id", editStudent);
router.delete("/:id", removeStudent);

module.exports = router;