const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    //serve static files from the public directory
    //req.url using the ternary operator. If root directory, then index.html else the req.url
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
});

//This getContentType function is used to determine the content type of a file based on its extension. 
//It takes filePath as an argument which is the path of the file 
//path.extname(filePath) will extract the filepath from the argument
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

//Listen on port 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//======================================================================================//
//To run the website, create a server connection
//1. node server.js in console
//2. http://localhost:3000 in browser