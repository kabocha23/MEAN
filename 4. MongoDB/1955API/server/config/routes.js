var mongoose = require('mongoose');
var OldPeople = mongoose.model('OldPeople');
var oldPeopleCont = require('../controllers/oldPeopleCont.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        oldPeopleCont.showAll(req, res)
    });
    
    app.get('/new/:name', function(req, res) {
        oldPeopleCont.addNewOldPerson(req, res)
    });
    
    app.get('/remove/:name', function(req, res) {
        oldPeopleCont.removeOldPerson(req, res)
    });
    
    app.get('/:name', function(req, res) {
        oldPeopleCont.showOneOldPerson(req, res)  
    });
    
}




