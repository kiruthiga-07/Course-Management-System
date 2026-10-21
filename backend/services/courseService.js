const { readDB, writeDB } = require("../models/db");
const makeId = require("../utils/makeId");

const getAllCourses = () => {
    return readDB().courses;
};

const getCourseById = (id) => {
    return readDB().courses.find((course) => course.id === id);
};

const createCourse = (courseData) => {
    const db = readDB();
    const newCourse = {
        ...courseData,
        id: courseData.id || makeId("course")
    };
    db.courses.push(newCourse);
    writeDB(db);
    return newCourse;
};

const updateCourse = (id, courseData) => {
    const db = readDB();
    const index = db.courses.findIndex((course) => course.id === id);
    if (index === -1) {
        return null;
    }
    db.courses[index] = {
        ...db.courses[index],
        ...courseData,
        id
    };
    writeDB(db);
    return db.courses[index];
};

const deleteCourse = (id) => {
    const db = readDB();
    const index = db.courses.findIndex((course) => course.id === id);
    if (index === -1) {
        return false;
    }
    db.courses.splice(index, 1);
    writeDB(db);
    return true;
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};