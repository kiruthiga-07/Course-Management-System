const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const { readDB, writeDB } = require("../models/db");

const SALT_ROUNDS = 12;

function createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

function toPublicStudent(student) {
    const publicStudent = {
        id: student.id,
        name: student.name,
        email: student.email,
        department: student.department
    };

    if (student.rollNo) {
        publicStudent.rollNo = student.rollNo;
    }

    return publicStudent;
}

async function registerStudent({ name, email, password, department, rollNo }) {
    const normalizedEmail = normalizeEmail(email);

    if (readDB().students.some((student) => student.email === normalizedEmail)) {
        throw createError("Email is already registered", 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const db = readDB();

    if (db.students.some((student) => student.email === normalizedEmail)) {
        throw createError("Email is already registered", 409);
    }

    const student = {
        id: randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        department: department.trim(),
        createdAt: new Date().toISOString()
    };

    if (typeof rollNo === "string" && rollNo.trim()) {
        student.rollNo = rollNo.trim();
    }

    db.students.push(student);
    writeDB(db);

    return { ...toPublicStudent(student), createdAt: student.createdAt };
}

async function loginStudent({ email, password }) {
    const normalizedEmail = normalizeEmail(email);

    const student = readDB().students.find(
        (item) => item.email === normalizedEmail
    );

    if (!student || !student.passwordHash) {
        throw createError("Invalid email or password", 401);
    }

    const passwordMatches = await bcrypt.compare(password, student.passwordHash);

    if (!passwordMatches) {
        throw createError("Invalid email or password", 401);
    }

    return toPublicStudent(student);
}

async function resetStudentPassword({ email, password }) {
    const normalizedEmail = normalizeEmail(email);

    const exists = readDB().students.some(
        (student) => student.email === normalizedEmail && student.passwordHash
    );

    if (!exists) {
        throw createError("No account found for that email", 404);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const db = readDB();
    const index = db.students.findIndex(
        (student) => student.email === normalizedEmail
    );

    if (index === -1) {
        throw createError("No account found for that email", 404);
    }

    db.students[index] = { ...db.students[index], passwordHash };
    writeDB(db);
}

module.exports = {
    registerStudent,
    loginStudent,
    resetStudentPassword
};
