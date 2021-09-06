var express = require("express");
var app = express();
var router = express.Router();
("");

router.get("/main", function (request, response) {
  response.sendFile(__dirname + "/public/main.html");
});

module.exports = router;
