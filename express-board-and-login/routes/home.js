var express = require('express');
var router = express.Router();


//Home
router.get('/', function(req, res){
    // console.log(1);
    // console.log(req.user);
    res.render('home/index', {user: req.user});
    // res.send('hi');
});

module.exports = router;
