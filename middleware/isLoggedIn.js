<<<<<<< HEAD
var isLoggedIn = function (req,res,next){
=======
function isLoggedIn(req,res,next){
>>>>>>> routes
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = isLoggedIn;
