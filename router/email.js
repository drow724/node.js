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

router.post("/form", function (request, response) {
  console.log(request.body.email);
  response.render("email.ejs", { email: request.body.email });
});

router.post("/ajax", function (request, response) {
  var email = request.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from user where email="' + email + '"',
    function (err, rows) {
      if (err) throw error;
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
      }
      response.json(responseData);
    }
  );
});

module.exports = router;
