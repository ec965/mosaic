const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const commentSchema = new Schema({
  username: String,
  updated: {type: Date, default: Date.now},
  text: String,
  edited:{type: Boolean, default: false}
})

commentSchema.pre('save', function(next){
  var comment = this;
  comment.updated = Date.now();
  next();
})

const dataSchema = new Schema({
  username: {type: String, require: true},
  updated: {type: Date, default: Date.now},
  title: {type: String},
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
  },
  comments: [commentSchema]
});


dataSchema.pre('save', function(next){
  var item = this;
  item.updated = Date.now();

  item.dimension = minMaxCheck(item.dimension,1,30);
  item.pixelSize = minMaxCheck(item.pixelSize,1,40);
  item.borderRadius = minMaxCheck(item.borderRadius,0,50);
  item.rmin = minMaxCheck(item.rmin,0,255);
  item.rmax = minMaxCheck(item.rmax,0, 255);
  item.gmin = minMaxCheck(item.gmin,0,255);
  item.gmax = minMaxCheck(item.gmax,0, 255);
  item.bmin = minMaxCheck(item.bmin,0,255);
  item.bmax = minMaxCheck(item.bmax,0, 255);
  sortHueRowLen = minMaxCheck(item.sortHueRowLen, 0, item.dimension);
  sortHueColLen = minMaxCheck(item.sortHueColLen, 0, item.dimension);
  next();
})

const minMaxCheck = (item, min, max) => {
  if (item > max){
    item = max;
  } else if(item < min){
    item = min;
  }
  return item;
}

module.exports = mongoose.model('Data', dataSchema);