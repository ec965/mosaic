const bcrypt = require('bcrypt');
const saltRounds = require('../config/salt')
const {Schema} = require('mongoose');
const mongoose = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, index:{unique:true}},
  password: {type:String, required: true},
  date: {type: Date, default: Date.now}
})

userSchema.statics.hashPassword = function(password, cb){
  bcrypt.hash(password, saltRounds, function(err, hash){
    cb(err, hash);
  })
}

userSchema.methods.checkPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, result){
    cb(err, result);
  });
}

module.exports = mongoose.model('User', userSchema);