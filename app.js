const http = require("http");
const express = require("express");
const { urlencoded } = require("express");
const app = express();
const bodyParser = require("body-parser");
var urlencoder = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");

//var msg = "Backend Message!!!";
var BooksList = [];
var error;

app.get("/", function (req, res) {
  res.render("index", { titles: BooksList, error: error });
  error = "";
});

app.post("/titles", urlencoder, function (req, res) {
  console.log(req.body);
  if (req.body.method == "delete") {
    BooksList.splice(req.body.id, 1);
  } else if (
    req.body.title == "" ||
    req.body.title == null ||
    req.body.author == "" ||
    req.body.author == null
  ) {
    error = "Pole nie może być puste";
    res.redirect("/");
    return;
  } else {
    const book = { title: req.body.title, author: req.body.author };
    BooksList.push(book);
  }
  res.redirect("/");
});

const server = http.createServer(app);
const port = 8000;
server.listen(port);
console.debug("Server listening on port " + port);
