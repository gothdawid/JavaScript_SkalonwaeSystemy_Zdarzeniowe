const book = require("express").Router();

const getone = require("./getbook")
const all = require("./all");
const create = require("./create");
const deleteBook = require("./delete");
const update = require("./update")

book.get("/:id", getone)
book.get("/", all);
book.post("/", create);
book.delete("/:id", deleteBook);
book.put("/:id", update);

module.exports = book;
