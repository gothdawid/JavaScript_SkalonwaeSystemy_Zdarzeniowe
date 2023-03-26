require("./app/db/db.connect");

const express = require("express");
const routes = require("./app/routes");

const app = express();
const port = process.env.PORT || 8000;

app.use("/", routes);

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || "An error occured",
    errors: err.error || [],
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not found",
  });
});

app.listen(port);

console.log(`Server started on port ${port}`);
