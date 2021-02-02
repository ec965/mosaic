const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const dataSchema = new Schema({
  user: {type: String, require: true},
  updated: {type: Date, default: Date.now},
  name: {type: String},
  project:{
    dimension: Number,
    pixelSize: Number,
    borderRadius: Number,
    rmin: Number,
    rmax: Number,
    gmin: Number,
    gmax: Number,
    bmin: Number,
    bmax: Number,
    sortHueRow: Boolean,
    sortHueCol: Boolean,
    sortHueRowLen: Number,
    sortHueColLen: Number,
  }
});

dataSchema.pre('save', function(next){
  var item = this;
  item.updated = Date.now();
  next();
})

module.exports = mongoose.model('Data', dataSchema);