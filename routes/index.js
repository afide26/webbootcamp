app.get('/', function(req, res){
  res.render('campgrounds/landing');
});

// ===================
// AUTH ROUTES
// ===================
app.get('/register', function(req,res){
  req.body.username = " ";
  req.body.password = " ";
  res.render('register');
});

app.post('/register', function(req,res){
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

app.get('/login', function(req, res){
  res.render('login');
});
app.post('/login', passport.authenticate("local", {
  successRedirect:"/campgrounds",
  failureRedirect:'/login'
}),function(req, res){

});

// ===================
// LOGOUT ROUTES
// ===================

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});
