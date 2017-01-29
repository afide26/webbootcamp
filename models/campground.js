var mongoose   = require('mongoose');
require('mongo-relation');

var campgroundSchema = new mongoose.Schema({
  name: String,
  image:String,
  description: String,
  comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ]
});
campgroundSchema.hasMany('comments', {dependent:'destroy|delete|nullify'});

var Campground = mongoose.model("campgrounds",campgroundSchema );
module.exports = Campground;
