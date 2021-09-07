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
  response.render("join.ejs");
});

router.post("/", function (request, response) {
  var body = request.body;
  var email = body.email;
  var name = body.name;
  var passwd = body.password;

  var sql = { email: email, name: name, pw: passwd };
  var query = connection.query(
    "insert into user set ?",
    sql,
    function (error, rows) {
      if (error) {
        throw error;
      }
      console.log("ok db insert : ", rows.insertId, name);
      response.render("welcome.ejs", { name: name, id: rows.insertId });
    }
  );
});

module.exports = router;
