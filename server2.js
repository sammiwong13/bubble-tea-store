const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bubble-tea-store-database"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check against the database
    const query = "SELECT * FROM account WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error querying the database:", err);
            res.status(500).send("Internal server error");
            return;
        }

        if (results.length > 0) {
            // Authentication successful
            res.send("Login successful!");
        } else {
            // Authentication failed
            res.send("Invalid email or password");
        }
    });
});

app.post("/pages/register", (req, res) => {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM account WHERE email = ?";
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error("Error checking email in the database:", err);
            res.status(500).send("Internal server error");
            return;
        }

        if (results.length > 0) {
            // Email already exists
            res.send("Email already registered. Please use a different email.");
        } else {
            // Email is unique, insert into the database
            const insertQuery = "INSERT INTO account (name, email, password) VALUES (?, ?, ?)";
            db.query(insertQuery, [name, email, password], (err, results) => {
                if (err) {
                    console.error("Error inserting data into the database:", err);
                    res.status(500).send("Internal server error");
                    return;
                }

                // Registration successful
                res.send("Registration successful!");
            });
        }
    });
});

// Catch-all route to serve index.html from the public folder
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = http.createServer(app);



// // node server.js in console
// // http://localhost:3000 in browser