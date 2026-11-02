const express = require("express");
const mongoose = require("mongoose");

const Message = require("../models/Message");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/contacts/list", authenticateToken, async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.user.sub)) {
            return res.status(401).json({ success: false, message: "Invalid user identity" });
        }

        const users = await User.find({ _id: { $ne: req.user.sub } })
            .select("name role")
            .sort({ name: 1 })
            .lean();

        res.json({
            success: true,
            contacts: users.map((user) => ({
                id: String(user._id),
                name: user.name,
                role: user.role
            }))
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:userId", authenticateToken, async (req, res, next) => {
    try {
        const myId = req.user.sub;
        const otherId = req.params.userId;

        if (
            !mongoose.isValidObjectId(myId) ||
            !mongoose.isValidObjectId(otherId)
        ) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const messages = await Message.find({
            $or: [
                { sender: myId, recipient: otherId },
                { sender: otherId, recipient: myId }
            ]
        })
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        res.json({ success: true, messages: messages.reverse() });
    } catch (error) {
        next(error);
    }
});

module.exports = router;