var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//비동기 실행
app.listen(3000, function() {
    console.log("start!! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//URL Routing
app.get('/', function(request, response){
    response.sendFile(__dirname + "/public/main.html");
});

app.get('/main', function(request, response){
    response.sendFile(__dirname + "/public/main.html");
});

app.post('/email_post', function(request, response){
    //get : req.param('email');
    console.log(request.body.email);
    response.send("<h1>welcome!" + request.body.email + " </h1>");
})