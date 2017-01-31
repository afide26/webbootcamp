var express = require('express');
var router  = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var Campground = require('./../models/campground');


router.get('/', (req,res)=>{
  Campground.find({}, (err,allCampgrounds)=>{
    if(err){
      console.log("Error", err);
    }else{
      res.render('campgrounds/index', {campgrounds:allCampgrounds});
    }
  })
});

// CREATE ROUTE
router.post('/', isLoggedIn, (req,res)=>{
  var name  = req.body.name;
  var image = req.body.image;
  var desc  = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name:name, image:image, description: desc, author: author};
  Campground.create(newCampground,(err,campground)=>{
    if(err){
      console.log(err);
    }else{
      console.log(campground);
      res.redirect('/campgrounds');
    }
  });
});

// NEW ROUTE
router.get('/new', isLoggedIn, (req,res)=>{
  res.render('campgrounds/new');
});



router.get('/:id/edit', (req,res)=>{

});

// SHOW
router.get('/:id', function(req, res){
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
    if(err){
      console.log("Camp not found", err);
    }else{
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

module.exports = router;
