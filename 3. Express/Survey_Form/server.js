var express = require("express");
var session = require('express-session');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'jsonjsonjson',
    resave: true,
    saveUninitialized: true
}));

app.get("/", function (req, res){
    res.render('survey', {title: "Survey Form", session: req.session});
});

app.post("/survey_submit", function (req, res){
    req.session.name = req.body.your_name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comments = req.body.comments;    
    
    res.redirect('/result')
});


app.get("/result", function (req, res){

    res.render('result', {title: "Results Page", session: req.session});
});

app.get("/goback", function (req, res){
    res.redirect('/');
});

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));

app.listen(8000, function() {
    console.log("listening on port 8000");
});