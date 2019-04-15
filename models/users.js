var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user=new Schema({
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






// UserSchema.methods.comparePassword = function (passw, cb) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };





mongoose.model('users',user);

