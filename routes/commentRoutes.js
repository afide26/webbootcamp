var express    = require('express');
var router     = express.Router({mergeParams: true});
var isLoggedIn = require('../middleware/isLoggedIn');
var Campground = require('./../models/campground');
var Comment = require('./../models/comment');
var checkCommentOwner = require('../middleware/checkCommentOwner');



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
});

// COMMENTS EDIT ROUTE
router.get('/:comment_id/edit', checkCommentOwner, (req,res)=>{
  Comment.findById(req.params.comment_id, (err, foundComment)=>{
    if(err){
      res.redirect('back');
    }else{
      res.render('comments/edit', {campground_id: req.params.id, comment:foundComment});
    }
  });
});

// COMMENTS UPDATE ROUTE
router.put('/:comment_id', checkCommentOwner, (req,res)=>{
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
    if(err){
      res.redirect('back');
    }else{
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete('/:comment_id', checkCommentOwner, (req, res)=>{
  Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
    if(err){
      res.redirect('back');
    }else{
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
})

module.exports = router;
