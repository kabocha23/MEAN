var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/mongooses');
var MongooseDBSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    weight: {type: Number, required: true, minlength: 1},
    phrase: {type: String, required: true, minlength: 1}
},{timestamps: true})
mongoose.model('MongooseDB', MongooseDBSchema);
mongoose.Promise = global.Promise;
var MongooseDB = mongoose.model('MongooseDB');

app.get('/', function(req, res) {
    MongooseDB.find({}, function(err, mongooseList){
        if(err) {
            console.log('something went wrong while looking for mongooseList');
        } else {
            console.log('No Error while looking for mongooseList');
            res.render('index', {
                'mongooseList': mongooseList
            });
        }
    });
});

app.get('/mongooses/new', function(req, res) {
    res.render('newMongoose',{title:"New Mongoose", route:"/mongooses"});
});

app.get('/mongooses/:id', function(req, res) {
    MongooseDB.findOne({_id: req.params.id}, function(err, mongooseList){
        if(err) {
            console.log('something with the save went wrong');
        } else {
            res.render('mongooses', {data: mongooseList});
        }
    })
});

app.get('/mongooses/edit/:id', function(req, res) {
    MongooseDB.find({_id: req.params.id}, function(err, mongooseList){
        if(err) {
            console.log('something with the save went wrong');
        } else {
            var route = "/mongooses/" + req.params.id;
            res.render('newMongoose',{title:"Edit Mongoose", route: route, data: mongooseList});
        }
    })    
});

app.post('/mongooses', function(req, res) {
    console.log("POST DATA", req.body);
    var newMongoose = new MongooseDB({name: req.body.name, weight: req.body.weight, phrase: req.body.phrase});
    newMongoose.save(function(err) {
        if(err) {
            console.log(err);
            console.log('something with the newMongoose went wrong');
        } else {
            console.log('successfully added a newMongoose!');
            res.redirect('/');
        }
    })
});

app.post('/mongooses/:id', function(req, res) {
    MongooseDB.findOne({_id: req.params.id}, function(err, mongooseList){
        mongooseList.name = req.body.name || mongooseList.name;
        mongooseList.weight = req.body.weight || mongooseList.weight;
        mongooseList.phrase = req.body.phrase || mongooseList.phrase;
        mongooseList.save(function(err) {
            if(err) {
                console.log('something with the save went wrong');
            } else {
                console.log('successfully saved!');
                res.redirect('/');
            }
        })
    })    
});

app.post('/mongooses/destroy/:id', function(req, res) {
    MongooseDB.remove({_id: req.params.id}, function(err){
        console.log("Mongoose Deleted", req.body);
        res.redirect("/");
    })
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});