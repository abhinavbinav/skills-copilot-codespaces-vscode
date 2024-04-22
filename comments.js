// Create web server
// Create a web server that listens on port 3000. When you visit http://localhost:3000/, it should display a page with the title "Comments" and a list of comments. The comments are in a separate file called comments.json. You should read the comments from the file and display them on the page.
// If the file does not exist, the server should respond with a 404 error.
// If there is an error reading the file, the server should respond with a 500 error.
// Example:
// $ cat comments.json
// [
//   "This is a comment",
//   "This is another comment"
// ]
// $ node comments.js
// Server is running on http://localhost:3000/
// $ curl http://localhost:3000/
// <h1>Comments</h1>
// <ul>
//   <li>This is a comment</li>
//   <li>This is another comment</li>
// </ul>
// $ rm comments.json
// $ curl http://localhost:3000/
// 404 Not Found
// $ touch comments.json
// $ chmod a-w comments.json
// $ curl http://localhost:3000/
// 500 Internal Server Error
// $ chmod a+w comments.json
// $ curl http://localhost:3000/
// <h1>Comments</h1>
// <ul>
//   <li>This is a comment</li>
//   <li>This is another comment</li>
// </ul>
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const data = await fs.readFile(path.join(__dirname, 'comments.json'));
      const comments = JSON.parse(data);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Comments</h1>');
      res.write('<ul>');
      for (const comment of comments) {
        res.write(`<li>${comment}</li>`);
      }
      res.write('</ul>');
      res.end();
    } catch (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('500 Internal Server