var mongoose   = require('mongoose');
require('mongo-relation');

var campgroundSchema = new mongoose.Schema({
  name: String,
  image:String,
  description: String,
  price: {type: String, default: '0.00'},
  author: {
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username: String
  },
  comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ]
});
campgroundSchema.hasMany('comments', {dependent:'destroy|delete|nullify'});
campgroundSchema.belongsTo('user', {dependent:'destroy|delete|nullify'});

var Campground = mongoose.model("campgrounds",campgroundSchema );
module.exports = Campground;
