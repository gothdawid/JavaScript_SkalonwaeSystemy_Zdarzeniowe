const front = require("express").Router();
const home = require("./home");
const authors = require("./authors");
const books = require("./books");

front.get("/", home);
front.get("/authors", authors);
front.get("/books", books);


module.exports = front;


