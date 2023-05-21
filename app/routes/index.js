const routes = require("express").Router();
const bodyParser = require("body-parser");

const author = require("./author");
const book = require("./book");
const front = require("./front");

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

routes.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API",
  });
});

routes.use("/author", author);
routes.use("/book", book);
routes.use("/front", front);

module.exports = routes;
