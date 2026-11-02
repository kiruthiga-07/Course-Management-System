const Course = require("../models/Course");
const makeId = require("../utils/makeId");

function clean(data) {
    const { _id, id, __v, ...rest } = data || {};
    return rest;
}

const getAllCourses = async () => {
    const courses = await Course.find();
    return courses.map((course) => course.toJSON());
};

const getCourseById = async (id) => {
    const course = await Course.findById(id);
    return course ? course.toJSON() : null;
};

const createCourse = async (courseData) => {
    const id = (courseData && (courseData.id || courseData._id)) || makeId("course");
    const existing = await Course.findById(id);
    if (existing) {
        const error = new Error("A course with this id already exists");
        error.statusCode = 409;
        throw error;
    }
    const course = await Course.create({ ...clean(courseData), _id: id });
    return course.toJSON();
};

const updateCourse = async (id, courseData) => {
    const course = await Course.findByIdAndUpdate(
        id,
        { $set: clean(courseData) },
        { new: true, strict: false }
    );
    return course ? course.toJSON() : null;
};

const deleteCourse = async (id) => {
    const course = await Course.findByIdAndDelete(id);
    return !!course;
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};