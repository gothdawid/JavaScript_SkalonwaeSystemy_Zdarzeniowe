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
  author: PersonModelSchema
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

app.get("/api", urlencoder, async function (req, res) {
  BooksList = await BookModel.find();
  res.send(BooksList)
})
app.post("/api", urlencoder, async function (req, res) {
  var person = await PersonModel.findOneAndUpdate(
    {_id: req.body.author_id},
    {
      firstName: req.body.old_author.split(" ")[0],
      lastName: req.body.old_author.split(" ")[1]
    })
  var ret = await BookModel.findOneAndUpdate(
    {_id: req.body.title_id},
    {
      title: req.body.old_title,
      author: person
    })
    res.send(ret)
})
app.put("/api", urlencoder, async function (req, res) {
  console.log(req.query)
  if (
    req.query.title == "" ||
    req.query.title == null ||
    req.query.author == "" ||
    req.query.author == null
  ) {
    res.send("Pole nie może być puste")
  } 
  else {
    var tmp = req.query.author.split(" ")
    var fN = tmp[0]
    var lN = tmp[1]

    var person = await PersonModel.findOne({firstName: fN, lastName: lN})
    if (person == null || person == "") {
      person = new PersonModel({ firstName: fN, lastName: lN });
    }

    var book = new BookModel({ 
      title: req.query.title,
      author: person
    });

    person.save();
    book.save();
    res.send(book);
  }
})
app.delete("/api", urlencoder, async function (req, res) {
  return await BookModel.findOneAndRemove({ _id: req.body.title_id });
})



app.post("/titles", urlencoder, async function (req, res) {
  console.log(req.body);
  if (req.body.action == "Delete") {
    var ret = await BookModel.findOneAndRemove({ _id: req.body.title_id });
    //console.log(ret);
  } 
  else if(req.body.action == "Edit") {
    var person = await PersonModel.findOneAndUpdate(
      {_id: req.body.author_id},
      {
        firstName: req.body.old_author.split(" ")[0],
        lastName: req.body.old_author.split(" ")[1]
      })
    var ret = await BookModel.findOneAndUpdate(
      {_id: req.body.title_id},
      {
        title: req.body.old_title,
        author: person
      })
  } 
  else if (
    req.body.title == "" ||
    req.body.title == null ||
    req.body.author == "" ||
    req.body.author == null
  ) {
    error = "Pole nie może być puste";
    res.redirect("/");
    return;
  } else {
    var tmp = req.body.author.split(" ")
    var fN = tmp[0]
    var lN = tmp[1]

    var person = await PersonModel.findOne({firstName: fN, lastName: lN})
    if (person == null || person == "") {
      person = new PersonModel({ firstName: fN, lastName: lN });
    }

    var book = new BookModel({ 
      title: req.body.title,
      author: person
    });

    person.save();
    book.save();
  }
  res.redirect("/");
});

const server = http.createServer(app);
const port = 8000;
server.listen(port);
console.debug("Server listening on port " + port);
