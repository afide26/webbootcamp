var express    = require('express');
var router     = express.Router();
var Campground = require('../models/campground');
var Comment    = require('../models/comment');

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req,res)=>{
  Campground.findById(req.params.id,(err, campground)=>{
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground:campground});
    }
  });
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req,res)=>{
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
});
