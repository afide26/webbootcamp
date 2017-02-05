var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user');
var {isLoggedIn} = require('../middleware/index');
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
      console.log(err);
      req.flash("error", err.message);
      return res.redirect('/register');
    }
    passport.authenticate("local")(req,res, function(){
      req.flash("success", "Welcome to YelpCamp " + user.username);
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
  // successRedirect:"/campgrounds",
  failureRedirect:'/login'
}),function(req, res){
  req.flash("success", "Welcome back to Yelp Camp");
  res.redirect('/campgrounds');
});

// ===================
// LOGOUT ROUTES
// ===================

router.get('/logout', function(req,res){
  req.logout();
  req.flash("success", "Thanks for visiting Yelp Camp");
  res.redirect('/');
});

module.exports = router;
