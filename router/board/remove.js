var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "34.64.253.179",
  port: 3306,
  user: "song",
  password: "!!Aa119562",
  database: "NodeJS",
});

router.get("/:id", function (request, response) {
  var id = request.params.id;

  var responseData = {};

  var query = connection.query(
    "delete from board where id =?",
    [id],
    function (error, rows) {
      if (error) throw err;

      if (rows.affectedRows > 0) {
        responseData.result = 1;
        responseData.data = id;
      } else {
        responseData.result = 0;
      }
      response.redirect("/main");
    }
  );
});

module.exports = router;
