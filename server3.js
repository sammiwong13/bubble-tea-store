const http = require("http");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/login") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const { email, password } = JSON.parse(body);

            const db = mysql.createConnection({
                host: "your-mysql-host",
                user: "your-mysql-username",
                password: "your-mysql-password",
                database: "your-database-name"
            });

            db.connect((err) => {
                if (err) throw err;

                const query = "SELECT * FROM users WHERE email = ? AND password = ?";
                db.query(query, [email, password], (err, results) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end("Internal Server Error");
                        db.end();
                        return;
                    }

                    if (results.length > 0) {
                        // Authentication successful, redirect to homepage
                        res.writeHead(302, { "Location": "/pages/homepage.html" });
                        res.end();
                    } else {
                        // Authentication failed, redirect back to login page
                        res.writeHead(302, { "Location": "/index.html" });
                        res.end();
                    }

                    db.end();
                });
            });
        });
    } else {
        // Serve static files
        const filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not Found");
            } else {
                res.writeHead(200, { "Content-Type": getContentType(filePath) });
                res.end(data);
            }
        });
    }
});

const getContentType = (filePath) => {
    const extname = path.extname(filePath);
    switch (extname) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".png":
            return "image/png";
        case ".jpg":
            return "image/jpg";
        default:
            return "application/octet-stream";
    }
};

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




// // node server.js in console
// // http://localhost:3000 in browser