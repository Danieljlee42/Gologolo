var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
   
   //for logo
   logoName: String,
   backgroundColor: String,
   borderColor: String,
   borderRadius: {type: Number, min: 2, max: 144},
   borderWidth: {type: Number, min: 2, max: 144},
   padding: {type: Number, min: 0, max: 144},
   margin: {type: Number, min: 0, max: 144},

   //dimension
   width: {type: Number, min: 0}, //cant be negative
   height: Number,

   //update
   lastUpdate: {type: Date, default: Date.now},
 
});

module.exports = mongoose.model('Logo', LogoSchema);