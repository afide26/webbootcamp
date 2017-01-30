var express    = require('express');
var router     = express.Router();
var Campground = require('../models/campground');
// INDEX show all campgrounds
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
