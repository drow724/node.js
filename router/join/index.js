var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var connection = mysql.createConnection({
  host: "34.64.253.179",
  port: 3306,
  user: "song",
  password: "!!Aa119562",
  database: "NodeJS",
});

connection.connect();

router.get("/", function (request, response) {
  var message;
  var errorMessage = request.flash("error");
  if (errorMessage) message = errorMessage;
  response.render("join.ejs", { message: message });
});

passport.serializeUser(function (id, done) {
  console.log("passport session save : ", id);
  done(null, id);
});

passport.deserializeUser(function (id, done) {
  console.log("passport session get id : ", id);
  done(null, id);
});

passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      var query = connection.query(
        "select * from user where email=?",
        [email],
        function (error, rows) {
          if (error) return done(error);

          if (rows.length) {
            console.log("existed user");
            return done(null, false, { message: "your email is already used" });
          } else {
            var sql = { email: email, pw: password };
            var query = connection.query(
              "insert into user set ?",
              sql,
              function (error, rows) {
                if (error) throw error;
                return done(null, { email: email, id: rows.insertId });
              }
            );
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash: true,
  })
);

module.exports = router;
