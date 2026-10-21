const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../services/studentService");

const getStudents = (req, res) => {
    const students = getAllStudents();
    res.status(200).json({ success: true, count: students.length, data: students });
};

const getStudent = (req, res) => {
    const student = getStudentById(req.params.id);
    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
};

const addStudent = (req, res) => {
    const newStudent = createStudent(req.body);
    res.status(201).json({ success: true, message: "Student created successfully", data: newStudent });
};

const editStudent = (req, res) => {
    const updatedStudent = updateStudent(req.params.id, req.body);
    if (!updatedStudent) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, message: "Student updated successfully", data: updatedStudent });
};

const removeStudent = (req, res) => {
    const deleted = deleteStudent(req.params.id);
    if (!deleted) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, message: "Student deleted successfully" });
};

module.exports = { getStudents, getStudent, addStudent, editStudent, removeStudent };