const http = require("http");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);
const port = 8000;
server.listen(port);
console.debug("Server listening on port " + port);
