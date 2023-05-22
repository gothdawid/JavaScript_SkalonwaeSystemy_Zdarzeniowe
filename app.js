require("./app/db/db.connect");

const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  fs = require("fs"),
  YAML = require("yaml"),
  routes = require("./app/routes");
  cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use("/", routes);

const file = fs.readFileSync("./config/apiSwagger.yml", "utf8");
const swaggerDocument = YAML.parse(file);

var options = {}

app.use('/api-docs', function(req, res, next){
  swaggerDocument.host = req.get('host');
  req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serveFiles(swaggerDocument, options), swaggerUi.setup());

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
