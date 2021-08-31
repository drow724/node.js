var express = require('express');
var app = express();
//비동기 실행
app.listen(3000, function() {
    console.log("start!! express server on port 3000");
});

app.use(express.static('public'));

//URL Routing
app.get('/', function(request, response){
    response.sendFile(__dirname + "/public/main.html");
});

app.get('/main', function(request, response){
    response.sendFile(__dirname + "/public/main.html");
});