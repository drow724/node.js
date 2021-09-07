var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var main = require("./main/main");
var join = require("./join/index");
var login = require("./login/index");
var logout = require("./logout/index");
var write = require("./board/write");
var detail = require("./board/detail");
var remove = require("./board/remove");
var modify = require("./board/modify");

//URL Routing
router.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use("/main", main);
router.use("/join", join);
router.use("/login", login);
router.use("/logout", logout);
router.use("/write", write);
router.use("/detail", detail);
router.use("/remove", remove);
router.use("/modify", modify);
module.exports = router;
