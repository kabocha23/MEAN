var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    age: {type: Number, min: 1, max: 150}
},{timestamps: true})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'


app.get('/', function(req, res) {
    User.find({}, function(err, users){
        if(err) {
            console.log('something went wrong while looking for users');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('No Error while looking for users');
            res.render('index', {
                'users': users
            });
        }
    });
// User.find({name:'Jessica'}, function(err, users) {
    // Retrieve an array of users matching the name. Even if 1 record is found, the result will be an array the size of 1, with 1 object inside. (Notice, if we are expecting to retrieve one record, we may want to use findOne and retrieve the object as oppose to an array the size of one.
    // This code will run when the DB is done attempting to retrieve all matching records to {name:'Jessica'}
    //    })
    // ...retrieve 1 record (the first record found) matching {} 
// User.findOne({}, function(err, user) {
    // Retrieve 1 object
    // This code will run when the DB is done attempting to retrieve 1 record.
//    })
})

app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var user = new User({name: req.body.name, age: req.body.age});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err) {
    // if there is an error console.log that something went wrong!
        if(err) {
            console.log('something went wrong');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            res.redirect('/');
        }
    })
})

app.post('/deleteUser', function(req, res) {
User.remove({_id: req.body.id}, function(err){
    // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
    console.log("User Deleted", req.body);
    })
})

// app.post('/updateUser', function(req, res){
//     // ...update any records that match the query
//     User.update({name:'Andrinnna'}, {name:'Andriana'}, function(err){
//         // This code will run when the DB has attempted to update the matching record.
//         console.log("User Updated", req.body);
//     })
//     // another way to update a record
//     User.find({name: 'Andriana'}, function(err, user){
//         user.name = 'Andri'
//         user.save(function(err){
//             // if save was successful awesome!
//         })
//     })
// })

app.listen(8000, function() {
    console.log("listening on port 8000");
})