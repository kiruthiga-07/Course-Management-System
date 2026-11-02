const bcrypt = require("bcryptjs");
const User = require("../models/User");

const SALT_ROUNDS = 12;

function createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

function toPublicStudent(user) {
    const publicStudent = {
        id: String(user._id),
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role || "student"
    };

    if (user.rollNo) {
        publicStudent.rollNo = user.rollNo;
    }

    return publicStudent;
}

async function registerStudent({ name, email, password, department, rollNo }) {
    const normalizedEmail = normalizeEmail(email);

    if (await User.findOne({ email: normalizedEmail })) {
        throw createError("Email is already registered", 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const data = {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        department: department.trim(),
        role: "student"
    };

    if (typeof rollNo === "string" && rollNo.trim()) {
        data.rollNo = rollNo.trim();
    }

    let user;
    try {
        user = await User.create(data);
    } catch (error) {
        if (error.code === 11000) {
            throw createError("Email is already registered", 409);
        }
        throw error;
    }

    return { ...toPublicStudent(user), createdAt: user.createdAt };
}

async function loginStudent({ email, password }) {
    const user = await User.findOne({ email: normalizeEmail(email) });

    if (!user || !user.passwordHash) {
        throw createError("Invalid email or password", 401);
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
        throw createError("Invalid email or password", 401);
    }

    return toPublicStudent(user);
}

async function resetStudentPassword({ email, password }) {
    const user = await User.findOne({ email: normalizeEmail(email) });

    if (!user) {
        throw createError("No account found for that email", 404);
    }

    user.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    await user.save();
}

module.exports = {
    registerStudent,
    loginStudent,
    resetStudentPassword
};