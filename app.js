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
    seedDB     = require('./seeds'),
    methodOverride = require('method-override');

// Route Requires
var campgroundRoutes = require('./routes/campgroundRoutes');
var commentRoutes = require('./routes/commentRoutes');
var indexRoutes = require('./routes/indexRoutes');


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// seedDB(); //Seed the database

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
});
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/', indexRoutes);

// PORT
app.listen(port, function(){
  console.log(`Yelp Camp server is running at ${port}`);
});
