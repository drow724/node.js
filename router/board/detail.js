var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var moment = require("moment");

var connection = mysql.createConnection({
  host: "34.64.253.179",
  port: 3306,
  user: "song",
  password: "!!Aa119562",
  database: "NodeJS",
});

router.get("/:id", function (request, response) {
  var userId = request.user;
  if (!userId) {
    response.redirect("/login");
  }
  var id = request.params.id;

  var responseData = {};

  var query = connection.query(
    "select * from board where id =?",
    [id],
    function (err, rows) {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = 1;
        responseData.data = rows;
      } else {
        responseData.result = 0;
      }
      response.render("detail.ejs", {
        userId: userId,
        board: responseData.data,
        moment: moment,
      });
    }
  );
});

module.exports = router;
