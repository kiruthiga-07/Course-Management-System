const { readDB, writeDB } = require("../models/db");
const makeId = require("../utils/makeId");

const getAllStudents = () => {
    return readDB().students;
};

const getStudentById = (id) => {
    return readDB().students.find((student) => student.id === id);
};

const createStudent = (studentData) => {
    const db = readDB();
    const newStudent = {
        ...studentData,
        id: studentData.id || makeId("stu")
    };
    db.students.push(newStudent);
    writeDB(db);
    return newStudent;
};

const updateStudent = (id, studentData) => {
    const db = readDB();
    const index = db.students.findIndex((student) => student.id === id);
    if (index === -1) {
        return null;
    }
    db.students[index] = {
        ...db.students[index],
        ...studentData,
        id
    };
    writeDB(db);
    return db.students[index];
};

const deleteStudent = (id) => {
    const db = readDB();
    const index = db.students.findIndex((student) => student.id === id);
    if (index === -1) {
        return false;
    }
    db.students.splice(index, 1);
    writeDB(db);
    return true;
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};