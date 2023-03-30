const author = require("express").Router();

const getOne = require("./getauthor")
const getAll = require("./all");
const create = require("./create");
const remove = require("./delete");
const update = require("./update");


author.get("/:id", getOne)
author.post("/", create);
author.get("/", getAll);
author.delete("/:id", remove);
author.put("/:id", update);

module.exports = author;
