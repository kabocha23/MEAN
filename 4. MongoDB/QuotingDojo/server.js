var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/quotingdojo');
var QuoterSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    quote: {type: String, required: true, minlength: 1}
},{timestamps: true})
mongoose.model('Quoter', QuoterSchema);
var Quoter = mongoose.model('Quoter');


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/quotes', function(req, res) {
    Quoter.find({}, function(err, quoters){
        if(err) {
            console.log('something went wrong while looking for quoters');
        } else {
            console.log('No Error while looking for quoters');
            res.render('quotes', {
                'quoters': quoters
            });
        }
    });
});

app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    var quoter = new Quoter({name: req.body.name, quote: req.body.quote});
    quoter.save(function(err) {
        if(err) {
            console.log('something went wrong');
        } else {
            console.log('successfully added a quoter!');
            res.redirect('/quotes');
        }
    })
});

app.post('/deleteQuoter/:id', function(req, res) {
    Quoter.remove({_id: req.params.id}, function(err){
        console.log("Quoter Deleted", req.body);
        res.redirect("/quotes");
    })
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});