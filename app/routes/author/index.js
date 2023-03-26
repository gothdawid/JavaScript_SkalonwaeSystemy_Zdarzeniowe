const author = require("express").Router();

const getAll = require("./all");
const create = require("./create");
const remove = require("./delete");

author.post("/", create);
author.get("/", getAll);
author.delete("/:id", remove);

module.exports = author;
