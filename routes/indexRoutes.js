var express  = require('express');
var router   = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var passport = require('passport');
var User     = require('../models/user');

// INDEX ROUTE
router.get('/', function(req, res){
  res.render('landing');
});
// ===================
// AUTH ROUTES
// ===================
router.get('/register', function(req,res){
  res.render('register');
});

router.post('/register', function(req,res){
  var newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(JSON.stringify(err, undefined,2));
      return res.render('register');
    }
    passport.authenticate("local")(req,res, function(){
      res.redirect('/campgrounds');
    });
  })
});
// ===================
// LOGIN ROUTES
// ===================

router.get('/login', function(req, res){
  res.render('login');
});
router.post('/login', passport.authenticate("local", {
  successRedirect:"/campgrounds",
  failureRedirect:'/login'
}),function(req, res){

});

// ===================
// LOGOUT ROUTES
// ===================

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

module.exports = router;