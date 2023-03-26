const book = require("express").Router();

const all = require("./all");
const create = require("./create");
const deleteBook = require("./delete");

book.get("/", all);
book.post("/", create);
book.delete("/:id", deleteBook);

module.exports = book;
