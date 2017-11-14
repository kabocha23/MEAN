var mongoose = require('mongoose');
var MongooseDB = mongoose.model('MongooseDB');
var mongooses = require('../controllers/mongooses.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        mongooses.showAll(req, res)
    });
    
    app.get('/mongooses/new', function(req, res) {
        res.render('newMongoose',{title:"New Mongoose", route:"/mongooses"});
    });
    
    app.get('/mongooses/:id', function(req, res) {
        mongooses.showOne(req, res)
    });
    
    app.get('/mongooses/edit/:id', function(req, res) {
        mongooses.routeToEdit(req, res)  
    });
    
    app.post('/mongooses', function(req, res) {
        mongooses.postNewMongoose(req, res)
    });
    
    app.post('/mongooses/:id', function(req, res) {
        mongooses.postMongooseEdit(req, res)
    });
    
    app.post('/mongooses/destroy/:id', function(req, res) {
        mongooses.removeMongoose(req, res)
    });
}








