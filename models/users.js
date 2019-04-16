var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user=new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    type:String,
    name:String,
    family:String,
    password:String,    
    email:String,
    city :String,
    gender:String,
    phone:String,
    active:Boolean
})










mongoose.model('users',user);

