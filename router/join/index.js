var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "password",
  database: "wolfgang",
});

connection.connect();

router.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "../../public/join.html"));
});

module.exports = router;
