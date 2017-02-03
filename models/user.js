var mongoose                = require('mongoose');
var passportLocalMongoose   = require('passport-local-mongoose');
require('mongo-relation');
var UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String
});

UserSchema.hasMany('comments', {dependent:'destroy|delete|nullify'},'camprounds',{dependent:'destroy|delete|nullify'});
UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User", UserSchema);
module.exports = User;
