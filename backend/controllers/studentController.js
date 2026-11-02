const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const LearningProgress = require("../models/LearningProgress");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

const publicFields = "name email role department rollNo createdAt updatedAt";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toResponse(user) {
    return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        rollNo: user.rollNo,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

async function getStudents(req, res, next) {
    try {
        const students = await User.find({ role: "student" })
            .select(publicFields)
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            count: students.length,
            students: students.map((item) => ({ ...item, id: String(item._id) }))
        });
    } catch (error) {
        next(error);
    }
}

async function getStudentById(req, res, next) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        const student = await User.findOne({
            _id: req.params.id,
            role: "student"
        })
            .select(publicFields)
            .lean();

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.json({ success: true, student: { ...student, id: String(student._id) } });
    } catch (error) {
        next(error);
    }
}

async function createStudent(req, res, next) {
    try {
        const { name, email, password, department, rollNo } = req.body || {};

        if (
            typeof name !== "string" ||
            !name.trim() ||
            name.trim().length > 100 ||
            typeof email !== "string" ||
            !EMAIL_PATTERN.test(email.trim()) ||
            typeof password !== "string" ||
            password.length < 12 ||
            password.length > 72
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid name, email and a password of 12 to 72 characters are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (await User.exists({ email: normalizedEmail })) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        const data = {
            name: name.trim(),
            email: normalizedEmail,
            passwordHash: await bcrypt.hash(password, 12),
            role: "student"
        };

        if (typeof department === "string") {
            data.department = department.trim();
        }

        if (typeof rollNo === "string" && rollNo.trim()) {
            data.rollNo = rollNo.trim();
        }

        const student = await User.create(data);

        res.status(201).json({
            success: true,
            message: "Student created",
            student: toResponse(student)
        });
    } catch (error) {
        next(error);
    }
}

async function updateStudent(req, res, next) {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        const body = req.body || {};
        const updates = {};

        if (body.name !== undefined) {
            if (typeof body.name !== "string" || !body.name.trim() || body.name.trim().length > 100) {
                return res.status(400).json({ success: false, message: "Invalid name" });
            }
            updates.name = body.name.trim();
        }

        if (body.email !== undefined) {
            if (typeof body.email !== "string" || !EMAIL_PATTERN.test(body.email.trim())) {
                return res.status(400).json({ success: false, message: "Invalid email" });
            }
            updates.email = body.email.trim().toLowerCase();
        }

        if (body.department !== undefined) {
            if (typeof body.department !== "string") {
                return res.status(400).json({ success: false, message: "Invalid department" });
            }
            updates.department = body.department.trim();
        }

        if (body.rollNo !== undefined) {
            if (typeof body.rollNo !== "string") {
                return res.status(400).json({ success: false, message: "Invalid roll number" });
            }
            updates.rollNo = body.rollNo.trim();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No valid fields supplied" });
        }

        if (
            updates.email &&
            (await User.exists({ email: updates.email, _id: { $ne: id } }))
        ) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        const student = await User.findOneAndUpdate(
            { _id: id, role: "student" },
            { $set: updates },
            { returnDocument: "after", runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.json({ success: true, message: "Student updated", student: toResponse(student) });
    } catch (error) {
        next(error);
    }
}

async function deleteStudent(req, res, next) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        const student = await User.findOneAndDelete({
            _id: req.params.id,
            role: "student"
        });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        await Promise.all([
            Enrollment.deleteMany({ student: student._id }),
            LearningProgress.deleteMany({ student: student._id }),
            Message.deleteMany({
                $or: [{ sender: student._id }, { recipient: student._id }]
            }),
            Notification.deleteMany({ recipient: student._id })
        ]);

        res.json({ success: true, message: "Student deleted" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};