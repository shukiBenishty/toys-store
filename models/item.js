var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var item=new Schema({
    name:String,
    url:String,
    quantity:Number,
    price:Number,
    category:String,
    description:String
})

mongoose.model('item',item);
