function checkCampgroundOwner(req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, (err,campground)=>{
      if(err){
        res.redirect('back');
      }else{
        if(campground.author.id.equals(req.user.id)){
          next()
        }else{
          res.redirect('back');
        }
      }
    });
  }else{
    res.redirect('back');
  }
}

module.exports = checkCampgroundOwner;
