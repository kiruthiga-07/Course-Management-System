const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "data", "db.json");

function readDB() {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
}

function writeDB(db) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

function makeId() {
    return Math.random().toString(36).slice(2, 10);
}

function sendJSON(res, data, status = 200) {
    res.status(status).type("application/json").send(JSON.stringify(data, null, 2));
}

function makeResource(name) {
    app.get("/" + name, (req, res) => {
        const db = readDB();
        sendJSON(res, db[name]);
    });

    app.get("/" + name + "/:id", (req, res) => {
        const db = readDB();
        const item = db[name].find((x) => x.id === req.params.id);
        if (!item) return sendJSON(res, { error: name.slice(0, -1) + " not found" }, 404);
        sendJSON(res, item);
    });

    app.post("/" + name, (req, res) => {
        const db = readDB();
        const item = { ...req.body, id: req.body.id || makeId() };
        db[name].push(item);
        writeDB(db);
        sendJSON(res, item, 201);
    });

    app.put("/" + name + "/:id", (req, res) => {
        const db = readDB();
        const index = db[name].findIndex((x) => x.id === req.params.id);
        if (index === -1) return sendJSON(res, { error: name.slice(0, -1) + " not found" }, 404);
        db[name][index] = { ...req.body, id: req.params.id };
        writeDB(db);
        sendJSON(res, db[name][index]);
    });

    app.patch("/" + name + "/:id", (req, res) => {
        const db = readDB();
        const index = db[name].findIndex((x) => x.id === req.params.id);
        if (index === -1) return sendJSON(res, { error: name.slice(0, -1) + " not found" }, 404);
        db[name][index] = { ...db[name][index], ...req.body, id: req.params.id };
        writeDB(db);
        sendJSON(res, db[name][index]);
    });

    app.delete("/" + name + "/:id", (req, res) => {
        const db = readDB();
        db[name] = db[name].filter((x) => x.id !== req.params.id);
        writeDB(db);
        res.status(204).end();
    });
}

// Home page: lists every resource in db.json, like json-server did.
app.get("/", (req, res) => {
    const db = readDB();
    const resources = Object.keys(db).map(
        (key) => `<li><a href="/${key}">/${key}</a> &mdash; ${db[key].length} items</li>`
    ).join("");

    res.send(`
        <html>
        <head>
            <title>Backend Server</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 600px; margin: 60px auto; color: #222; }
                h1 { border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                ul { line-height: 2; }
                a { color: #1a73e8; text-decoration: none; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <h1>Backend server is running</h1>
            <p>Available resources from db.json:</p>
            <ul>${resources}</ul>
        </body>
        </html>
    `);
});

makeResource("courses");
makeResource("students");
makeResource("enrollments");

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});