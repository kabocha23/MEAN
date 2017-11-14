var mongoose = require('mongoose');
var MongooseDB = mongoose.model('MongooseDB');


module.exports = {
    showAll: function(req, res) {
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
    },
    showOne: function(req, res) {
        MongooseDB.findOne({_id: req.params.id}, function(err, mongooseList){
            if(err) {
                console.log('something with the save went wrong');
            } else {
                res.render('mongooses', {data: mongooseList});
            }
        })
    },
    routeToEdit: function(req, res) {
        MongooseDB.find({_id: req.params.id}, function(err, mongooseList){
            if(err) {
                console.log('something with the save went wrong');
            } else {
                var route = "/mongooses/" + req.params.id;
                res.render('newMongoose',{title:"Edit Mongoose", route: route, data: mongooseList});
            }
        })  
    },
    postNewMongoose: function(req, res) {
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
    },
    postMongooseEdit: function(req, res) {
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
    },
        removeMongoose: function(req, res) {
        MongooseDB.remove({_id: req.params.id}, function(err){
            console.log("Mongoose Deleted", req.body);
            res.redirect("/");
        })
    }
}