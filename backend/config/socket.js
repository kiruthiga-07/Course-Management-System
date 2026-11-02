const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const { allowedOrigins } = require("./cors");

function initializeSocket(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"]
        }
    });

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth && socket.handshake.auth.token;

            if (!token) {
                return next(new Error("Authentication required"));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: ["HS256"]
            });

            if (!mongoose.isValidObjectId(decoded.sub)) {
                return next(new Error("User not found"));
            }

            const user = await User.findById(decoded.sub).select("_id name role");

            if (!user) {
                return next(new Error("User not found"));
            }

            socket.user = {
                id: String(user._id),
                name: user.name,
                role: user.role
            };

            next();
        } catch (error) {
            next(new Error("Invalid authentication token"));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.user.id;

        socket.join(`user:${userId}`);

        socket.on("send_message", async (data, ack) => {
            try {
                const { recipientId, text } = data || {};

                if (
                    !mongoose.isValidObjectId(recipientId) ||
                    typeof text !== "string" ||
                    !text.trim() ||
                    text.trim().length > 2000
                ) {
                    throw new Error("Invalid message data");
                }

                if (String(recipientId) === userId) {
                    throw new Error("You cannot message yourself");
                }

                const recipient = await User.findById(recipientId).select("_id");

                if (!recipient) {
                    throw new Error("Recipient not found");
                }

                const message = await Message.create({
                    sender: userId,
                    recipient: recipientId,
                    text: text.trim()
                });

                const payload = {
                    _id: message._id,
                    sender: userId,
                    recipient: String(recipientId),
                    text: message.text,
                    createdAt: message.createdAt
                };

                io.to(`user:${userId}`)
                    .to(`user:${recipientId}`)
                    .emit("receive_message", payload);

                const notification = await Notification.create({
                    recipient: recipientId,
                    message: `New message from ${socket.user.name}`
                });

                io.to(`user:${recipientId}`).emit("new_notification", notification);

                if (typeof ack === "function") {
                    ack({ success: true });
                }
            } catch (error) {
                if (typeof ack === "function") {
                    ack({ success: false, message: error.message });
                }
            }
        });
    });

    return io;
}

module.exports = initializeSocket;