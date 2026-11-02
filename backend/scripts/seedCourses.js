require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");

const Course = require("../models/Course");
const { courses } = require(path.join(__dirname, "..", "data", "db.json"));

async function seedCourses() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is required in .env");
        }

        await mongoose.connect(process.env.MONGO_URI);

        let added = 0;

        for (const course of courses) {
            const { id, _id, ...rest } = course;
            const courseId = id || _id;
            const exists = await Course.findById(courseId);

            if (!exists) {
                await Course.create({ ...rest, _id: courseId });
                added++;
            }
        }

        console.log("Courses added: " + added + ", already present: " + (courses.length - added));
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedCourses();