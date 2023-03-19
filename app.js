const http = require("http");
const express = require("express");
const { urlencoded } = require("express");
const app = express();
const bodyParser = require("body-parser");
var urlencoder = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");

var msg = "Backend Message!!!";

app.get("/", function (req, res) {
  res.render("index", { message: msg });
});

app.post("/msg", urlencoder, function (req, res) {
  msg = req.body.message;
  res.redirect("/");
});

const server = http.createServer(app);
const port = 8000;
server.listen(port);
console.debug("Server listening on port " + port);
