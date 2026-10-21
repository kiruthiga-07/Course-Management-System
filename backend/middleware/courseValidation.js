const validateCourse = (req, res, next) => {
    const { title, field, badge, duration, instructor, mode, certificate } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: "Course title is required" });
    }
    if (!field) {
        return res.status(400).json({ success: false, message: "Field is required" });
    }
    if (!badge) {
        return res.status(400).json({ success: false, message: "Level is required" });
    }
    if (!duration) {
        return res.status(400).json({ success: false, message: "Duration is required" });
    }
    if (!instructor) {
        return res.status(400).json({ success: false, message: "Instructor is required" });
    }
    if (!mode) {
        return res.status(400).json({ success: false, message: "Mode is required" });
    }
    if (!certificate) {
        return res.status(400).json({ success: false, message: "Certificate is required" });
    }

    next();
};

module.exports = validateCourse;