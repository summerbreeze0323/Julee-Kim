const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Post = mongoose.model('todo_2', {
    content: String
});

router.get('/', (req, res) => {
    // res.redirect('/posts');
    res.send('api works!');
});

/* show post list */
router.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.send(err);
        } else {
            res.json(posts);
        }
    });
});

/* create post */
router.post('/posts', (req, res) => {
    Post.create(req.body, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            res.send(post);
        }
    });
});

/* delete post */
router.delete('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.send(err);
        }

        Post.find({}, (err, posts) => {
            if (err) {
                res.send(err);
            } else {
                res.json(posts);
            }
        });
    });
});

/* update post */
router.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            res.json(post);
        }
    });
});

module.exports = router;
