var mongoose = require('mongoose');

var ImgSchema = new mongoose.Schema({

   //texts stuff
   name: String,
   url: String,

   //dimension
   width: { type: Number, min: 50, max: 144 },
   height: { type: Number, min: 50, max: 144 },

   //position
   x: {type: Number, min: 0, max: 500},
   y: {type: Number, min: 0, max: 500},

   //order
   order: {type: Number, min: 0}, //cant be negative
 
   //ID Of logo
   logoId: String 

});

module.exports = mongoose.model('Img', ImgSchema);