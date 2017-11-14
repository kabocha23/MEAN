var mongoose = require('mongoose');
var OldPeople = mongoose.model('OldPeople');


module.exports = {
    showAll: function(req, res) {
        OldPeople.find({}, function(err, oldPeopleList){
            if(err) {
                console.log('something went wrong while looking for Old People');
            } else {
                console.log('No Error while looking for Old People');
                res.json({
                    'oldPeopleList': oldPeopleList
                });
            }
        });
    },
    addNewOldPerson: function(req, res) {
        var newOldPerson = new OldPeople({name: req.params.name});
        newOldPerson.save(function(err) {
            if(err) {
                console.log(err);
                console.log('something with adding the new Old Person went wrong');
            } else {
                console.log('successfully added a new Old Person!');
                res.redirect('/');
            }
        })
    },
    removeOldPerson: function(req, res) {
        OldPeople.remove({name: req.params.name}, function(err){
            console.log("Old Person Deleted");
            res.redirect("/");
        })
    },
    showOneOldPerson: function(req, res) {
        OldPeople.findOne({name: req.params.name}, function(err, oldPeopleList){
            if(err) {
                console.log('something with the saving the Old Person went wrong');
            } else {
                res.json({data: oldPeopleList});
            }
        })
    }
}