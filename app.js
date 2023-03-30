require("./app/db/db.connect");

const express = require("express"),
bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const routes = require("./app/routes");

const app = express();
const port = process.env.PORT || 8000;


app.use("/", routes);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);



routes.use('/api-docs', swaggerUi.server);
routes.use('/api-docs', swaggerUi.setup(swaggerDocument));


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
