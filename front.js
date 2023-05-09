const express = require('express');

const http = require('http');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {mess:"test"});
})

const server2 = http.createServer(app);
const port = 3000;
server2.listen(port);
console.debug(`Server read at http://localhost:${port}`);