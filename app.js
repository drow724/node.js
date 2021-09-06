var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var cors = require("cors");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "password",
  database: "wolfgang",
});

connection.connect();

//비동기 실행
app.listen(3000, function () {
  console.log("start!! express server on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

//URL Routing
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function (request, response) {
  response.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function (request, response) {
  //get : req.param('email');
  console.log(request.body.email);
  //response.send("<h1>welcome!" + request.body.email + " </h1>");
  response.render("email.ejs", '{"email" : request.body.email}');
});

app.post("/ajax_send_email", function (request, response) {
  var email = request.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from user where email="' + email + '"',
    function (err, rows) {
      if (err) throw error;
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
      }
      response.json(responseData);
    }
  );
});
