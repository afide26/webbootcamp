var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var port    = process.env.PORT || 3000;

var campgrounds = [
  {
    name: "Salmon Creek",
    image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
  },
  {
    name: "Granite Hill",
    image:'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'
  },
  {
    name: "Mountain Goat's Rest",
    image:'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'
  },
  {
    name: "Salmon Creek",
    image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
  },
  {
    name: "Granite Hill",
    image:'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'
  },
  {
    name: "Mountain Goat's Rest",
    image:'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'
  },
  {
    name: "Salmon Creek",
    image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
  },
  {
    name: "Granite Hill",
    image:'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'
  },
  {
    name: "Mountain Goat's Rest",
    image:'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'
  }
];


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.get('/', function(req, res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  res.render('campgrounds', {campgrounds});
})

app.post('/campgrounds', function(req,res){
  var name  = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name, image:image}
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
});

// Route for the form
app.get('/campgrounds/new', function(req,res){
  res.render('new');
});
app.listen(port, function(){
  console.log(`Yelp Camp server is running at ${port}`);
})
