var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");

// DATABASE SETTING
var connection = mysql.createConnection({
  host: "34.64.253.179",
  port: 3306,
  user: "song",
  password: "!!Aa119562",
  database: "NodeJS",
});

connection.connect();

router.get("/", function (request, response) {
  var id = request.user;
  if (!id) response.render("login.ejs");
  response.render("write.ejs");
});

router.post("/", function (request, response) {
  var title = request.body.title;
  var userId = request.user.email;
  var content = request.body.content;

  var sql = { title, userId, content };
  var insertQuery = connection.query(
    "insert into board set ?",
    sql,
    function (err, rows) {
      if (err) throw err;
      var selectQuery = connection.query(
        "select id from board order by id desc limit 1",
        function (err, rows) {
          var id = rows[0].id;
          if (err) throw err;
          response.redirect("/detail/" + id);
        }
      );
    }
  );
});

module.exports = router;
