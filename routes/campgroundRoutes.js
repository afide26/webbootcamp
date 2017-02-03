var express = require('express');
var router  = express.Router();
var {isLoggedIn, checkCampgroundOwner} = require('../middleware/index');


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
      req.flash('success', `${campground.name} has been added to our list`);
      res.redirect('/campgrounds');
    }
  });
});

// NEW ROUTE
router.get('/new', isLoggedIn, (req,res)=>{
  res.render('campgrounds/new');
});


// EDIT Campground Route
router.get('/:id/edit', checkCampgroundOwner, function(req,res){
  Campground.findById(req.params.id, (err,campground)=>{
    res.render('campgrounds/edit', {campground});
  });
});

// UPDATE Campground Route
router.put('/:id', checkCampgroundOwner, function(req,res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground)=>{
    if(err){
      res.redirect('/campgrounds');
    }else{
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
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

// DESTROY route
router.delete('/:id', checkCampgroundOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, (err)=>{
      if(err){
        res.redirect('/campgrounds/:id');
      }else{
        res.redirect('/campgrounds');
      }
    });
});


module.exports = router;
