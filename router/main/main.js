var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

router.get("/", function (request, response) {
  console.log("main js loaded");
  response.sendFile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;
