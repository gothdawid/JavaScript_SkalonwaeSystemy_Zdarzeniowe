const http = require("http");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

var msg = "Backend Message!!!";

app.get("/", function (req, res) {
  res.render("index", { message: msg });
});

const server = http.createServer(app);
const port = 8000;
server.listen(port);
console.debug("Server listening on port " + port);
