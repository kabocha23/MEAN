var mongoose = require('mongoose');

var OldPeopleSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1}
},{timestamps: true})

var OldPeople = mongoose.model('OldPeople', OldPeopleSchema);
