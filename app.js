var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var router = require("./router/index");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var flash = require("connect-flash");

//비동기 실행
app.listen(3000, function () {
  console.log("start!! express server on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

app.use(router);
