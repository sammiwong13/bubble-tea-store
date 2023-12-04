const http = require("http");

function request_handler(req, res) {
    console.log(`New Request from ${req.socket.remoteAddress} for ${req.url}`);

    if (req.url === "/") {
        console.log("Redirecting to /public/index.html");
        res.writeHead(302, {
            'Location': 'public/index.html'  // Adjusted path
        });
        res.end();
    } else {
        console.log("Handling other requests");
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
}