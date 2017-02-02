var middlewareObj = {
  checkCampgroundOwner: function(req, res, next){
    if(req.isAuthenticated()){
      Campground.findById(req.params.id, (err,campground)=>{
        if(err){
          res.redirect('back');
        }else{
          if(campground.author.id.equals(req.user._id)){
            next()
          }else{
            res.redirect('back');
          }
        }
      });
    }else{
      res.redirect('back');
    }
  },

  checkCommentOwner: function (req, res, next){
    if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, (err,comment)=>{
        if(err){
          res.redirect('back');
        }else{
          if(comment.author.id.equals(req.user._id)){
            next()
          }else{
            res.redirect('back');
          }
        }
      });
    }else{
      res.render('login');
    }
  },
  isLoggedIn: function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error', "You have to be logged in");
    res.redirect('/login');
  }
};

module.exports = middlewareObj;
