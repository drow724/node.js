var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

router.get("/", function (request, response) {
  console.log("main js loaded", request.user);
  var id = request.id;
  //response.sendFile(path.join(__dirname, "../public/main.html"));
  response.render("main.ejs", { id: id });
});

module.exports = router;
