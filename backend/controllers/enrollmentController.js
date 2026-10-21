const {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
} = require("../services/enrollmentService");

const getEnrollments = (req, res) => {
    const enrollments = getAllEnrollments();
    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
};

const getEnrollment = (req, res) => {
    const enrollment = getEnrollmentById(req.params.id);
    if (!enrollment) {
        return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    res.status(200).json({ success: true, data: enrollment });
};

const addEnrollment = (req, res) => {
    const newEnrollment = createEnrollment(req.body);
    res.status(201).json({ success: true, message: "Enrollment created successfully", data: newEnrollment });
};

const editEnrollment = (req, res) => {
    const updatedEnrollment = updateEnrollment(req.params.id, req.body);
    if (!updatedEnrollment) {
        return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    res.status(200).json({ success: true, message: "Enrollment updated successfully", data: updatedEnrollment });
};

const removeEnrollment = (req, res) => {
    const deleted = deleteEnrollment(req.params.id);
    if (!deleted) {
        return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    res.status(200).json({ success: true, message: "Enrollment deleted successfully" });
};

module.exports = { getEnrollments, getEnrollment, addEnrollment, editEnrollment, removeEnrollment };