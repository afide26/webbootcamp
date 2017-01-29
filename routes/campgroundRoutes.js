var express = require('express');
var router  = express.Router();
var Campground = require('./../models/campground');

router.get('', (req,res)=>{
  Campground.find({}, (err,allCampgrounds)=>{
    if(err){
      console.log("Error", err);
    }else{
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
    }
  })
})

// NEW ROUTE
router.get('/new', (req,res)=>{
  res.render('campgrounds/new');
});

// CREATE ROUTE
router.post('/', (req,res)=>{
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
