const http = require("http");
const express = require("express");
const { urlencoded } = require("express");
const app = express();
const bodyParser = require("body-parser");
var urlencoder = bodyParser.urlencoded({ extended: false });

var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/books";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

//Define schema
var Schema = mongoose.Schema;
var PersonModelSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
});

var BookModelSchema = new Schema({
  title: String,
});

// Compile model from schema
var PersonModel = mongoose.model("PersonModel", PersonModelSchema);
var BookModel = mongoose.model("BookModel", BookModelSchema);

app.set("view engine", "ejs");

//var msg = "Backend Message!!!";
var BooksList = [];
var error;

app.get("/", async function (req, res) {
  BooksList = await BookModel.find();
  //console.log(BooksList);
  res.render("index", { titles: BooksList, error: error });
  error = "";
});

app.post("/titles", urlencoder, async function (req, res) {
  console.log(req.body);
  if (req.body.method == "delete") {
    //BooksList.splice(req.body.id, 1);
    var ret = await BookModel.findOneAndRemove({ _id: req.body.id });
    console.log(ret);
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
    // var person = new PersonModel({ firstName: "John", lastName: "Doe", age: 26 });
    var book = new BookModel({ title: req.body.title });

    book.save();
  }
  res.redirect("/");
});

const server = http.createServer(app);
const port = 8000;
server.listen(port);
console.debug("Server listening on port " + port);
