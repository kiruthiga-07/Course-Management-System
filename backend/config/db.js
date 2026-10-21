const path = require("path");

module.exports = {
    DB_PATH: path.join(__dirname, "..", "data", "db.json"),
    PORT: process.env.PORT || 5000
};