const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const dataSchema = new Schema({
  username: {type: String, require: true},
  edit_date: {type: Date, default: Date.now},
  data:{
    pixels:[{r:Number, g:Number, b:Number}]
  }
})

module.exports = mongoose.model('Data', dataSchema);