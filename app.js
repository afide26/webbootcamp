var express    = require('express');
    app        = express(),
    bodyParser = require('body-parser'),
    port       = process.env.PORT || 3000,
    mongoose   = require('mongoose'),
    passport   = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    Comment    = require('./models/comment'),
    User       = require('./models/user'),
    seedDB     = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
seedDB();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: "Yelp Camp is a great app!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// USER MIDDLEWARE
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

// INDEX ROUTE
app.get('/', function(req, res){
  res.render('campgrounds/landing');
});

app.get('/campgrounds', (req,res)=>{
  Campground.find({}, (err,allCampgrounds)=>{
    if(err){
      console.log("Error", err);
    }else{
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
    }
  })
})

// NEW ROUTE
app.get('/campgrounds/new', (req,res)=>{
  res.render('campgrounds/new');
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req,res)=>{
  Campground.findById(req.params.id, (err, campground)=>{
    if(err){
      console.log(err);
      res.redirect('/campgrounds');
    }else{
      Comment.create(req.body.comment, (err, comment)=>{
        if(err){
          console.log(err);
        }else{
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  });
})

// CREATE ROUTE
app.post('/campgrounds', (req,res)=>{
  var name  = req.body.name;
  var image = req.body.image;
  var desc  = req.body.description;
  var newCampground = {name:name, image:image, description: desc}
  Campground.create(newCampground,(err,campground)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/campgrounds');
    }
  });
});

app.get('/camgrounds/:id/edit', (req,res)=>{

});

// SHOW
app.get('/campgrounds/:id', function(req, res){
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
    if(err){
      console.log("Camp not found", err);
    }else{
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});
// =================
// COMMENTS ROUTES
// =================
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req,res)=>{
  Campground.findById(req.params.id,(err, campground)=>{
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground:campground});
    }
  });
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

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
// PORT
app.listen(port, function(){
  console.log(`Yelp Camp server is running at ${port}`);
});
