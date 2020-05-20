var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({

   //texts stuff
   text: String,
   color: String,
   fontSize: { type: Number, min: 2, max: 144 },

   //position
   x: {type: Number, min: 0, max: 500},
   y: {type: Number, min: 0, max: 500},

   //order
   order: {type: Number, min: 0}, //cant be negative
 
   //ID Of logo
   logoId: String 

});

module.exports = mongoose.model('Text', TextSchema);