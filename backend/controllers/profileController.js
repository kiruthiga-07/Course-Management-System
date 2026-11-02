const User = require("../models/User");

const fields = "name email role department rollNo createdAt";

async function getProfile(req, res, next) {
    try {
        const user = await User.findById(req.user.sub).select(fields).lean();

        if (!user) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        res.json({ success: true, user: { ...user, id: String(user._id) } });
    } catch (error) {
        next(error);
    }
}

async function updateProfile(req, res, next) {
    try {
        const { name } = req.body || {};

        if (typeof name !== "string" || !name.trim() || name.trim().length > 100) {
            return res.status(400).json({
                success: false,
                message: "Valid name is required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.sub,
            { $set: { name: name.trim() } },
            { returnDocument: "after", runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        res.json({
            success: true,
            message: "Profile updated",
            user: {
                id: String(user._id),
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                rollNo: user.rollNo,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getProfile, updateProfile };