var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user=new Schema({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    contacts: {type: [ {type: Schema.Types.ObjectId, ref: 'User', default: [] }] },
    groups: [ {type: Schema.Types.ObjectId, ref: 'Group',  default: [] }],
    picture: { type: String, default: "" },
    admin: { type: Boolean, default: false, required: true },
    online: { type: Boolean, default: false },
    createdAt: Date,
    updatedAt: Date,
    googleId: String,
    thumbnail: String,
    type:String,
    name:String,
    family:String,   
    email:String,
    city :String,
    gender:String,
    phone:String,
    active:Boolean
})










mongoose.model('users',user);

