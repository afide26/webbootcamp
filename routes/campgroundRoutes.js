var express = require('express');
var router  = express.Router();
var {isLoggedIn, checkCampgroundOwner} = require('../middleware/index');


router.get('/', (req,res)=>{
  Campground.find({}, (err,allCampgrounds)=>{
    if(err){
      console.log("Error", err);
    }else{
      res.render('campgrounds/index', {campgrounds:allCampgrounds, pageTitle:'Campgrounds'});
    }
  })
});

// CREATE ROUTE
router.post('/', isLoggedIn, (req,res)=>{
  var name  = req.body.name;
  var image = req.body.image;
  var desc  = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name:name, image:image, description: desc, author: author, price: req.body.price};
  Campground.create(newCampground,(err,campground)=>{
    if(err){
      console.log(err);
    }else{
      req.flash('success', `${campground.name} has been created.`);
      res.redirect('/campgrounds/'+campground._id);
    }
  });
});

// NEW ROUTE
router.get('/new', isLoggedIn, (req,res)=>{
  res.render('campgrounds/new', { pageTitle:'Add New Campground'});
});


// EDIT Campground Route
router.get('/:id/edit', isLoggedIn, function(req,res){
  Campground.findById(req.params.id, (err,campground)=>{
    res.render('campgrounds/edit', {campground:campground, pageTitle:'Edit Campground'});
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
      res.render("campgrounds/show", {campground: foundCampground, pageTitle: foundCampground.name});
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
