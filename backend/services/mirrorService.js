const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const LearningProgress = require("../models/LearningProgress");

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function findStudent(rollNo) {
    if (typeof rollNo !== "string" || !rollNo.trim()) {
        return null;
    }
    return User.findOne({
        rollNo: new RegExp("^" + escapeRegex(rollNo.trim()) + "$", "i")
    });
}

async function mirrorEnrollment(record) {
    try {
        const student = await findStudent(record.rollNo);
        const course = record.courseId ? await Course.findById(record.courseId) : null;

        if (!student || !course) {
            return;
        }

        const status = record.status === "completed" ? "completed" : "active";

        await Enrollment.findOneAndUpdate(
            { student: student._id, course: course._id },
            {
                $set: { status },
                $setOnInsert: {
                    enrolledAt: record.enrolledAt ? new Date(record.enrolledAt) : new Date()
                }
            },
            { upsert: true, new: true }
        );

        const parts = record.moduleProgress && typeof record.moduleProgress === "object"
            ? Object.values(record.moduleProgress)
            : [];
        const completedModules = parts.filter(
            (part) => part && part.photo && part.video && part.theory
        ).length;
        const percent = Number.isFinite(record.progress) ? record.progress : 0;
        const courseModules = Array.isArray(course.modules) ? course.modules.length : 0;

        let totalLessons = courseModules;
        if (totalLessons < 1) {
            totalLessons =
                percent > 0
                    ? Math.round((completedModules * 100) / percent)
                    : parts.length;
        }
        totalLessons = Math.max(totalLessons, completedModules, 1);
        const completedLessons = completedModules;

        let progress = await LearningProgress.findOne({
            student: student._id,
            course: course._id
        });

        if (!progress) {
            progress = new LearningProgress({
                student: student._id,
                course: course._id,
                completedLessons,
                totalLessons
            });
        } else {
            progress.completedLessons = completedLessons;
            progress.totalLessons = totalLessons;
        }

        progress.lastAccessedAt = new Date();
        await progress.save();
    } catch (error) {
        console.error("Could not mirror enrollment:", error.message);
    }
}

async function mirrorRemoval(record) {
    try {
        const student = await findStudent(record.rollNo);

        if (!student || !record.courseId) {
            return;
        }

        await Enrollment.deleteOne({ student: student._id, course: record.courseId });
        await LearningProgress.deleteOne({ student: student._id, course: record.courseId });
    } catch (error) {
        console.error("Could not remove mirrored enrollment:", error.message);
    }
}

module.exports = { mirrorEnrollment, mirrorRemoval };