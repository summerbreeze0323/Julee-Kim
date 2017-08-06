var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Post = mongoose.model('Post');

/* GET post list */
router.get('/', function (req, res) {
    var page = req.query.page;

    if(page === undefined || page === null) {page = 1;}

    var limitSize = 10; // 한 페이지에 보여주는 post 수
    var skipSize = (page-1) * limitSize;
    var pageNum = 1;  // pageNum은 query로 받아옴.
    var search_text = "";
    var search_type = "";

    if (req.query.search_text) {
        search_text = req.query.search_text;
        search_type = req.query.search_type;
    }

    if (search_text !== "" || search_type !== "") {
        search_type = req.query.search_type.split('+');
        var search_text = req.query.search_text;
        var query = {$or: []};

        search_type.forEach(function(type) {
            var sub_query = {};
            var regex = new RegExp(search_text, 'i');

            sub_query[type] = regex;
            query['$or'].push(sub_query);
        });

        Post.count(query, function(err, totalCount) {
            var pageNum = Math.ceil(totalCount/limitSize);

            Post.find(query).sort('-created_at').skip(skipSize).limit(limitSize).exec(function (err, posts) {
                if (err) return res.json({success: false, message: err});
                res.render('board/index', {posts: posts, user:req.user, pagination:pageNum, search_type:search_type ,search_text:search_text});
            });
        });
    } else {
        Post.count({}, function(err, totalCount){
            pageNum = Math.ceil(totalCount/limitSize);

            Post.find().sort('-created_at').skip(skipSize).limit(limitSize).exec(function (err, posts) {
                if (err) return res.json({success: false, message: err});
                res.render('board/index', {posts: posts, user:req.user, pagination:pageNum, search_type: search_type, search_text:search_text});
            });
        });
    }
});

/* Show create post page */
router.get('/create', function (req, res) {
    res.render('board/create', {user: req.user});
    console.log(req.user);
});

/* Create post */
router.post('/create', function (req, res) {
    new Post({
        writer: req.user.username,
        author: req.user._id,
        title: req.body.title,
        body: req.body.content,
        created_at: Date.now()
    }).save(function () {
        res.redirect('/board');
    });
});

/* Show post by id post */
router.get('/show/:id', function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) return res.json({success: false, message: err});
        post.views++;
        post.save();

        res.render('board/show', {data: post, user: req.user});
    });
});

/* Show detail post */
router.get('/update/:id', function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) return res.json({success: false, message: err});
        res.render('board/edit', {data: post, user: req.user});
    })
});

/* Update post */
router.post('/update/:id', function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        post.title = req.body.title;
        post.body = req.body.body;
        post.updated_at = Date.now();
        post.save(function (err) {
            res.redirect('/board');
        });
    });
});

/* Delete by id post */
router.get('/delete/:id', function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) return res.json({success: false, message: err});
        res.redirect('/board');
    });
});

module.exports = router;
