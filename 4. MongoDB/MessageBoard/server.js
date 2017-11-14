var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/dojomessages');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
    name: {type: String, required: true },  
    message: {type: String, required: true }, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });

var CommentSchema = new mongoose.Schema({
    name: {type: String, required: true },
    comment: {type: String, required: true },
    _post: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {timestamps: true });

mongoose.model('Post', PostSchema);
var Post = mongoose.model('Post');
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

app.get('/', function(req, res){
    Post.find({})
    .populate('comments')
    .exec(function(err, postsList, count) {
        res.render('index', {
            'postsList': postsList
        });
    });
});

app.post('/posts', function (req, res){
    var newPost = new Post({name: req.body.name, message: req.body.message});
    newPost.save(function(err) {
        if(err) {
            console.log(err);
            console.log('something with the newMongoose went wrong');
        } else {
            console.log('successfully added a newMongoose!');
            res.redirect('/');
        }
    });
});

app.post('/posts/:id', function (req, res){
    Post.findOne({_id: req.params.id}, function(err, post){
        var comment = new Comment({name: req.body.name, comment: req.body.comment});
        comment._post = post._id;
        comment.save(function(err){
            post.comments.push(comment);
            post.save(function(err){
                if(err) { console.log('Error'); } 
                else { res.redirect('/'); }
            });
        });
    });
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});