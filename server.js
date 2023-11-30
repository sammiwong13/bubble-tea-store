const express = require("express");
const path = require("path");
const app = express();

//serve static files from the public directory
app.use(express.static("public"));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//start the web server
app.listen(3000, function () {
    console.log("listening to port 3000...");
});


///////
const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bubble-tea-store-database"
});

conn.connect(function (err) {
    if (err) {
        console.log("Error connecting to MySQL: ", err);
    } else {
        console.log("Connection established");
    }
});

// app.use(session({
//     secret: 'webslesson',
//     resave: true,
//     saveUninitialized: true
// }));


// node server.js in console
// http://localhost:3000 in browser