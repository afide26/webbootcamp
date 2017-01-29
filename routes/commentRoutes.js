var express    = require('express');
var router     = express.Router({mergeParams: true});
var isLoggedIn = require('../middleware/isLoggedIn');

// =================
// COMMENTS ROUTES
// =================
router.get('/new', isLoggedIn, (req,res)=>{
  Campground.findById(req.params.id,(err, campground)=>{
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground:campground});
    }
  });
});

router.post('/', isLoggedIn, (req,res)=>{
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

module.exports = router;
