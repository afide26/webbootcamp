var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var port       = process.env.PORT || 3000;
var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image:String
});

var Campground = mongoose.model("campgrounds",campgroundSchema );

// Campground.create({
//       name: "Mountain Goat's Rest",
//       image:'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'
// }, (err, campground)=>{
//   if(err){
//     console.log("Error:", err);
//   }else{
//     console.log("A new campground has been added", campground);
//   }
// });



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.get('/', function(req, res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  Campground.find({}, (err,allCampgrounds)=>{
    if(err){
      console.log("Error", err);
    }else{
      res.render("campgrounds", {campgrounds:allCampgrounds});
    }
  })
})

app.post('/campgrounds', function(req,res){
  var name  = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name, image:image}
  Campground.create(newCampground,(err,campground)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/campgrounds');
    }
  });

});

// Route for the form
app.get('/campgrounds/new', function(req,res){
  res.render('new');
});
app.listen(port, function(){
  console.log(`Yelp Camp server is running at ${port}`);
})
