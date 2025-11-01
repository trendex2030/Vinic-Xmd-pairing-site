const express = require('express');
const app = express();
const path = require("path");
__path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 20087;
let code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'home')));


app.use('/code', code);


app.use('/', async (req, res, next) => {
  res.sendFile(path.join(__dirname, "home", "index.html"));
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:` + PORT)
});
