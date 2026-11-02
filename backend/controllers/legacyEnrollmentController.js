const {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
} = require("../services/enrollmentService");

const getEnrollments = async (req, res, next) => {
    try {
        const enrollments = await getAllEnrollments();
        res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
    } catch (error) {
        next(error);
    }
};

const getEnrollment = async (req, res, next) => {
    try {
        const enrollment = await getEnrollmentById(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }
        res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        next(error);
    }
};

const addEnrollment = async (req, res, next) => {
    try {
        const newEnrollment = await createEnrollment(req.body);
        res.status(201).json({ success: true, message: "Enrollment created successfully", data: newEnrollment });
    } catch (error) {
        next(error);
    }
};

const editEnrollment = async (req, res, next) => {
    try {
        const updatedEnrollment = await updateEnrollment(req.params.id, req.body);
        if (!updatedEnrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }
        res.status(200).json({ success: true, message: "Enrollment updated successfully", data: updatedEnrollment });
    } catch (error) {
        next(error);
    }
};

const removeEnrollment = async (req, res, next) => {
    try {
        const deleted = await deleteEnrollment(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }
        res.status(200).json({ success: true, message: "Enrollment deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = { getEnrollments, getEnrollment, addEnrollment, editEnrollment, removeEnrollment };