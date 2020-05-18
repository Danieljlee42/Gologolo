var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  
  //texts stuff
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  
  //position for image and text 
  x: {type: Number, min: 0, max: 500},
  y: {type: Number, min: 0, max: 500},

  //order
  order: {type: Number, min: 0}, //cant be negative

  //image stuff
  name: String,
  url: String, 

  //dimension
  width: {type: Number, min: 0}, //cant be negative
  heigth: {type: Number, min: 0}, //cant be negative

  //for logo
  id: String,
  logoName: String,
  backgroundColor: String,
  borderColor: String,
  borderRadius: {type: Number, min: 2, max: 144},
  borderWidth: {type: Number, min: 2, max: 144},
  padding: {type: Number, min: 2, max: 144},
  margin: {type: Number, min: 2, max: 144},
  lastUpdate: {type: Date, default: Date.now},

  //for user
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,

  //arrays
  texts: [Object],
  imgs: [Object]



});

module.exports = mongoose.model('Logo', LogoSchema);