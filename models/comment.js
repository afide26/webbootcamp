var mongoose   = require('mongoose');
require('mongo-relation');
var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    username:String
  },
  created: {type: Date, default: Date.now}
});
commentSchema.belongsTo('campground');

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
