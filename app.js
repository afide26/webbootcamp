var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var path       = require('path');
var port       = process.env.PORT || 3000;
var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");
var Campground = require('./models/campground');
var Comment    = require('./models/comment');
// var User       = require('./models/user');
var seedDB     = require('./seeds');


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.render('campgrounds/landing');
});
seedDB();


// INDEX ROUTE
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

app.post('/campgrounds/:id/comments',(req,res)=>{
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
app.get('/campgrounds/:id/comments/new', (req,res)=>{
  Campground.findById(req.params.id,(err, campground)=>{
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground:campground});
    }
  });
})
// PORT
app.listen(port, function(){
  console.log(`Yelp Camp server is running at ${port}`);
});
