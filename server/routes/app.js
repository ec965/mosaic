const express = require('express');
const router = express.Router();
const Data = require("../models/data");

// READ
// get all a user's data
router.get('/', (req, res, next) => {
  Data.
    find().
    where('username').
    equals(req.user.username).
    sort({updated: -1}).
    exec(function(err, data){
      if(err) return next(err);

      res.json({username:req.user.username, data: data});

    });
})

// CREATE
// insert a new data model into the db
router.post('/', (req, res, next) => {

  if(req.user.username && req.body){
    Data.create({
      username: req.user.username,
      project: req.body.project,
      title: req.body.title,
    }, function(err, data){
      if(err) return next(err);

      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

// UPDATE
// update data of id
router.put('/', (req, res, next) => {
  if(req.body.data && req.body.id){
    Data.updateOne({_id:req.body.id}, {title:req.body.title, project:req.body.project},function(err, opResult){
      if(err) return next(err);

      res.sendStatus(200);
    })
  } else {
    res.sendStatus(400);
  }
});

// DELETE
// delete data of id
router.delete('/', (req, res, next) => {
  if(req.body.id){
    Data.deleteOne({_id: req.body.id}, function(){
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
})
module.exports=router;

// get the 18 most recent projects for the home page 
router.get('/recent', (req,res,next) => {
  Data
    .find()
    .limit(18)
    .sort({updated: -1})
    .exec(function(err,data) {
      if(err) return next(err);

      res.json(data);
    })
});