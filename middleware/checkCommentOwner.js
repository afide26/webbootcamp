function checkCommentOwner(req, res, next){
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
}

module.exports = checkCommentOwner;
