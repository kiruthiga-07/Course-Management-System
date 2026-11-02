const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

async function enrollCourse(req, res, next) {
    try {
        const studentId = req.user.sub;
        const { courseId } = req.body;

        if (!mongoose.isValidObjectId(studentId)) {
            return res.status(401).json({
                success: false,
                message: "Invalid student identity"
            });
        }

        if (typeof courseId !== "string" || !courseId.trim()) {
            return res.status(400).json({
                success: false,
                message: "Valid course ID is required"
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const existingEnrollment = await Enrollment.findOne({
            student: studentId,
            course: courseId
        });

        if (existingEnrollment && existingEnrollment.status === "withdrawn") {
            existingEnrollment.status = "active";
            existingEnrollment.enrolledAt = new Date();
            await existingEnrollment.save();

            return res.status(201).json({
                success: true,
                message: "Course enrollment successful",
                enrollment: existingEnrollment
            });
        }

        if (existingEnrollment) {
            return res.status(409).json({
                success: false,
                message: "Already enrolled in this course"
            });
        }

        const enrollment = await Enrollment.create({
            student: studentId,
            course: courseId
        });

        return res.status(201).json({
            success: true,
            message: "Course enrollment successful",
            enrollment
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Already enrolled in this course"
            });
        }

        next(error);
    }
}

async function getMyCourses(req, res, next) {
    try {
        const studentId = req.user.sub;

        if (!mongoose.isValidObjectId(studentId)) {
            return res.status(401).json({
                success: false,
                message: "Invalid student identity"
            });
        }

        const enrollments = await Enrollment.find({
            student: studentId,
            status: { $in: ["active", "completed"] }
        })
            .populate("course")
            .sort({ enrolledAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            totalEnrollments: enrollments.length,
            enrollments
        });
    } catch (error) {
        next(error);
    }
}

async function unenrollCourse(req, res, next) {
    try {
        const studentId = req.user.sub;
        const { courseId } = req.params;

        if (!mongoose.isValidObjectId(studentId) || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Invalid student or course ID"
            });
        }

        const enrollment = await Enrollment.findOneAndUpdate(
            {
                student: studentId,
                course: courseId,
                status: { $in: ["active", "completed"] }
            },
            { $set: { status: "withdrawn" } },
            { returnDocument: "after" }
        );

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "You are not enrolled in this course"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully unenrolled from course"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { enrollCourse, getMyCourses, unenrollCourse };