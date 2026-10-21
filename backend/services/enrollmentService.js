const { readDB, writeDB } = require("../models/db");
const makeId = require("../utils/makeId");

const getAllEnrollments = () => {
    return readDB().enrollments;
};

const getEnrollmentById = (id) => {
    return readDB().enrollments.find((enrollment) => enrollment.id === id);
};

const createEnrollment = (enrollmentData) => {
    const db = readDB();
    const newEnrollment = {
        ...enrollmentData,
        id: enrollmentData.id || makeId("enr")
    };
    db.enrollments.push(newEnrollment);
    writeDB(db);
    return newEnrollment;
};

const updateEnrollment = (id, enrollmentData) => {
    const db = readDB();
    const index = db.enrollments.findIndex((enrollment) => enrollment.id === id);
    if (index === -1) {
        return null;
    }
    db.enrollments[index] = {
        ...db.enrollments[index],
        ...enrollmentData,
        id
    };
    writeDB(db);
    return db.enrollments[index];
};

const deleteEnrollment = (id) => {
    const db = readDB();
    const index = db.enrollments.findIndex((enrollment) => enrollment.id === id);
    if (index === -1) {
        return false;
    }
    db.enrollments.splice(index, 1);
    writeDB(db);
    return true;
};

module.exports = {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
};