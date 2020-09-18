// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// HTML Routes
// =============================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API Routes
// =============================================================
app.get("/api/notes", function (req, res) {
    let getNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(getNotes);
});

app.post("/api/notes", function (req, res) {
    let postNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    req.body.id = postNotes.length
    postNotes.push(req.body)
    postNotes = JSON.stringify(postNotes)
    fs.writeFileSync("db/db.json", postNotes, "utf8");
    res.json(JSON.parse(postNotes));
});

app.delete("/api/notes/:id", function (req, res) {
    let deleteNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let myNote = deleteNotes.filter(function (note) {
        return note.id != req.params.id;
    });
    myNote = JSON.stringify(myNote);
    fs.writeFileSync("./db/db.json", myNote, "utf8")
    res.send(JSON.parse(myNote));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});