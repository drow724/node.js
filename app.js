var express = require('express');
var app = express();
//비동기 실행
app.listen(3000, function() {
    console.log("start!! express server on port 3000");
});

app.get('/', function(request, response){
    response.sendFile(__dirname + "/public/main.html");
});