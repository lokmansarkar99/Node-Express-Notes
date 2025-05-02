const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const qs = require('querystring');

const PORT = 3000;
const dataPath = './data.json';

// Load or initialize data
let urlData = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath)) : {};

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      const html = fs.readFileSync('./index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else if (req.url === '/style.css') {
      const css = fs.readFileSync('./style.css');
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(css);
    } else {
      // Redirect if short URL exists
      const short = req.url.slice(1);
      if (urlData[short]) {
        res.writeHead(301, { Location: urlData[short] });
        res.end();
      } else {
        res.writeHead(404);
        res.end('URL not found');
      }
    }
  } else if (req.method === 'POST' && req.url === '/shorten') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const { longUrl } = qs.parse(body);
      const shortCode = crypto.randomBytes(3).toString('hex');
      urlData[shortCode] = longUrl;

      fs.writeFileSync(dataPath, JSON.stringify(urlData));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<p>Shortened URL: <a href="/${shortCode}">http://localhost:${PORT}/${shortCode}</a></p>`);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
