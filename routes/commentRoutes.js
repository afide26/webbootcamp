var express    = require('express');
var router     = express.Router({mergeParams: true});
var isLoggedIn = require('../middleware/isLoggedIn');
var Campground = require('./../models/campground');
var Comment = require('./../models/comment');


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
          comment.author.id       = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  });
})

module.exports = router;
