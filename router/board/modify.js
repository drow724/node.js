var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var moment = require("moment");

// DATABASE SETTING
var connection = mysql.createConnection({
  host: "34.64.253.179",
  port: 3306,
  user: "song",
  password: "!!Aa119562",
  database: "NodeJS",
});

router.get("/:id", function (req, res) {
  var id = req.params.id;
  if (!req.user) return res.redirect("/login");
  var responseData = {};
  var query = connection.query(
    "select * from board where id =?",
    [id],
    function (err, rows) {
      if (err) throw err;
      if (rows[0].userId === req.user.email) {
        responseData.result = 1;
        responseData.data = rows;
      } else {
        var id = req.user;
        responseData.result = 0;
        return res.redirect("/main");
      }
      res.render("modify.ejs", {
        board: responseData.data,
        moment: moment,
      });
    }
  );
});

router.post("/:id", function (request, response) {
  var id = request.params.id;
  var title = request.body.title;
  var content = request.body.content;

  var responseData = {};

  var query = connection.query(
    "update board set title = ? , content = ? where id = ?",
    [title, content, id],
    function (err, rows) {
      if (err) throw err;
      if (rows.length) {
        responseData.result = 1;
        responseData.data = rows;
      } else {
        responseData.result = 0;
      }
      response.redirect("/detail/" + id);
    }
  );
});

module.exports = router;
