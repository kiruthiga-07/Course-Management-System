const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

async function connectDB() {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is not configured in .env");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected: " + mongoose.connection.name);
}

module.exports = { PORT, connectDB };