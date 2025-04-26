const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = 5000;

const server = http.createServer(async (req, res) => {  // make the handler async
    res.writeHead(200, { "Content-Type": "text/html" });

    if (req.url === '/') {
        res.write(`<h1>Hello, You are on Home Page</h1>`);
        res.end();
    } 
    
    else if (req.url === '/about') {
        const filePath = path.join(__dirname, "about.html");

        try {
            const data = await fs.readFile(filePath, "utf-8");
            res.write(data);
        } catch (error) {
            console.log(error);
            res.write(`<h1>Error loading About page</h1>`);
        }

        res.end();
    }

    else {
        res.write(`<h1>404 Not Found</h1>`);
        res.end();
    }

    // log every request
    fs.writeFile(
        path.join(__dirname, "log.txt"),
        `Request made at ${new Date().toLocaleString()} to ${req.url}\n`,
        { flag: "a" }
    )
    .then(() => {
        console.log(`Log written successfully - ${new Date().toLocaleString()}`);
    })
    .catch((err) => {
        console.error("Error writing log:", err);
    });

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
