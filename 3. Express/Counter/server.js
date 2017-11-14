var express = require("express");
var session = require('express-session');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'jsonjsonjson'}));

app.get("/", function (req, res){
    if(req.session.count){
        req.session.count++;
     } else {
        req.session.count = 1;
     }
    res.render('count', {title: "Counter Assignment", session: req.session});
});

app.get("/double", function (req, res){
    req.session.count++;
    res.redirect('/');
});

app.get("/reset", function (req, res){
    req.session.count = -1;
    res.redirect('/');
});

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));

app.listen(8000, function() {
    console.log("listening on port 8000");
});