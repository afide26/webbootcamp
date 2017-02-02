var express    = require('express');
var router     = express.Router({mergeParams: true});
var Campground = require('./../models/campground');
var Comment = require('./../models/comment');
var {isLoggedIn, checkCommentOwner} = require('../middleware/index');



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
          req.flash("success", "Successfully added comment");
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
      req.flash("success", "Successfully edited comment");
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
      req.flash("success", "Comment deleted");
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
})

module.exports = router;
