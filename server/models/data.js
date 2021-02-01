const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const dataSchema = new Schema({
  user: {type: String, require: true},
  updated: {type: Date, default: Date.now},
  name: {type: String},
  project:{
    pixels:[
      {
        r:Number, 
        g:Number, 
        b:Number
      }
    ]
  }
});

dataSchema.pre('save', function(next){
  var item = this;
  item.updated = Date.now();
  next();
})

module.exports = mongoose.model('Data', dataSchema);