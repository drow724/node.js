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

router.get("/", function (request, response) {
  var responseData = {};
  var query = connection.query(
    "select * from board ORDER BY id DESC",
    function (error, rows) {
      if (error) throw error;
      if (rows.length) {
        responseData.result = 1;
        responseData.data = rows;
      } else {
        responseData.result = 0;
      }
      var id = request.user;
      response.render("main.ejs", {
        id: id,
        board: responseData.data,
        moment: moment,
      });
    }
  );
});

module.exports = router;
