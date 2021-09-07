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

router.post("/", function (request, response) {
  var body = request.body;
  var email = body.email;
  var name = body.name;
  var passwd = body.password;

  var query = connection.query(
    'insert into user (email,name,pw) values ("' +
      email +
      '", "' +
      name +
      '", "' +
      passwd +
      '")',
    function (error, rows) {
      if (error) {
        throw error;
      }
      console.log("ok db insert");
    }
  );
});

module.exports = router;
