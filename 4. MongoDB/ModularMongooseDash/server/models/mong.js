var mongoose = require('mongoose');

var MongooseDBSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    weight: {type: Number, required: true, minlength: 1},
    phrase: {type: String, required: true, minlength: 1}
},{timestamps: true})

var MongooseDB = mongoose.model('MongooseDB', MongooseDBSchema);
