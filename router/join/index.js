var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "password",
  database: "wolfgang",
});

connection.connect();

router.get("/", function (request, response) {
  response.render("join.ejs");
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
      console.log("local-join callback called");
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

// router.post("/", function (request, response) {
//   var body = request.body;
//   var email = body.email;
//   var name = body.name;
//   var passwd = body.password;

//   var sql = { email: email, name: name, pw: passwd };
//   var query = connection.query(
//     "insert into user set ?",
//     sql,
//     function (error, rows) {
//       if (error) {
//         throw error;
//       }
//       console.log("ok db insert : ", rows.insertId, name);
//       response.render("welcome.ejs", { name: name, id: rows.insertId });
//     }
//   );
// });

module.exports = router;
