var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

var router = express.Router();
var User = mongoose.model('users')

passport.use('local_login',
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        }, function(email, password, done){
            User.findOne({email:email}, function(err, user){
                if (err) return done(err);
                if (!user) {
                    console.log('log in failed - user is not a valid');
                    return done(null, false);
                }
                bcrypt.compare(password, user.password, function(err, res){
                    if (err) return done(null, false);

                    done(null, user);
                });
            });
        }
    )
);

/* 사용자 인증에 성공했을 때 */
passport.serializeUser(function(user, done){
    done(null, user);
});

/* 사용자 인증 이후 사용자 요청이 있을 때마다 호출*/
passport.deserializeUser(function(user, done){
    User.findById(user._id).exec(function(err, user){
        done(null, user);
    });
});

/* 로그인 */
router.get('/login', function(req, res){
    res.render('user/login', {user:req.user});
});

router.post('/login', passport.authenticate('local_login', {
    successRedirect: '/',
    failureRedirect: '/users/loginFailure'
}));

router.get('/loginFailure', function(req, res, next){
    res.send('Failed to authenticate.');
});

/* 회원가입 */
router.get('/signup', function(req, res){
    res.render('user/signup.ejs', {user: req.user});
});

router.post('/signup', function(req, res){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            new User({
                email: req.body.email,
                password: hash,
                salt: salt,
                username: req.body.username
            }).save(function(err, user){
                if(err) return res.send(err);
                //db저장, 로그인 하고 메인페이지로 이동
                passport.authenticate('local_login')(req, res, function(){
                    res.redirect('/');
                });
            });
        });
    });

});

/* 로그아웃 */
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
