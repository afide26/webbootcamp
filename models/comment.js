var mongoose   = require('mongoose');
require('mongo-relation');
var commentSchema = new mongoose.Schema({
  text: String,
  author: String,
  created: {type: Date, default: Date.now}
});
commentSchema.belongsTo('campground');

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
