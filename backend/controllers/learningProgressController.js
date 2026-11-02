const mongoose = require("mongoose");
const LearningProgress = require("../models/LearningProgress");
const Enrollment = require("../models/Enrollment");

async function updateProgress(req, res, next) {
    try {
        const studentId = req.user.sub;
        const { courseId, completedLessons, totalLessons } = req.body;

        if (
            !mongoose.isValidObjectId(studentId) ||
            typeof courseId !== "string" ||
            !courseId.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid student or course ID"
            });
        }

        if (
            !Number.isInteger(completedLessons) ||
            !Number.isInteger(totalLessons) ||
            totalLessons < 1 ||
            completedLessons < 0 ||
            completedLessons > totalLessons
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid lesson progress values"
            });
        }

        const enrollment = await Enrollment.findOne({
            student: studentId,
            course: courseId,
            status: "active"
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "You must be enrolled in this course"
            });
        }

        let progress = await LearningProgress.findOne({
            student: studentId,
            course: courseId
        });

        if (!progress) {
            progress = new LearningProgress({
                student: studentId,
                course: courseId,
                completedLessons,
                totalLessons
            });
        } else {
            progress.completedLessons = completedLessons;
            progress.totalLessons = totalLessons;
        }

        progress.lastAccessedAt = new Date();

        await progress.save();

        if (progress.progressPercentage === 100) {
            await Enrollment.findOneAndUpdate(
                { student: studentId, course: courseId },
                { $set: { status: "completed" } }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Learning progress updated successfully",
            progress
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Progress record already exists. Please retry."
            });
        }

        next(error);
    }
}

async function getMyProgress(req, res, next) {
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
        }).select("course");

        const courseIds = enrollments.map((enrollment) => enrollment.course);

        const progressRecords = await LearningProgress.find({
            student: studentId,
            course: { $in: courseIds }
        })
            .populate("course", "title")
            .sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Learning progress fetched successfully",
            totalCourses: progressRecords.length,
            progress: progressRecords
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { updateProgress, getMyProgress };