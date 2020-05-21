var mongoose = require('mongoose');

var ImgSchema = new mongoose.Schema({

   //texts stuff
   name: String,
   url: String,

   //dimension
   width: Number,
   height: Number,

   //position
   x: Number,
   y: Number,

   //order
   order: {type: Number, min: 0}, //cant be negative
 
   //ID Of logo
   logoId: String 

});

module.exports = mongoose.model('Img', ImgSchema);