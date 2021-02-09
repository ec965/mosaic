const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Data = require("../models/data");
const User = require('../models/users');

const POSTLIMIT=12;

// READ
// get all a user's data
router.get("/myprojects", (req, res, next) => {
  if(req.query.date && req.query.username){
    Data.find()
      .where('updatedAt').lt(req.query.date)
      .where('username').equals(req.query.username)
      .limit(POSTLIMIT)
      .sort({updatedAt: -1})
      .select("username title project updatedAt")
      .exec(function (err, data) {
        if(err) return next(err);
        User.findOne({username: req.query.username}, 'username createdAt', function(err, user){
          if (err) return next(err);
          res.json({ user: user, data: data, postlimit: POSTLIMIT });
        })
      })
  } else {
    res.sendStatus(400);
  }
});

// CREATE
// insert a new data model into the db
router.post("/new", (req, res, next) => {
  if (req.user.username && req.body) {
    Data.create(
      {
        username: req.user.username,
        project: req.body.project,
        title: req.body.title,
      },
      function (err, data) {
        if (err) return next(err);

        res.json(data._id);
      }
    );
  } else {
    res.sendStatus(400);
  }
});

// UPDATE
// update data of id
router.patch("/update", (req, res, next) => {
  if (!req.body) return res.sendStatus(400);

  Data.findOne(
    {
      username: req.user.username,
      _id: req.body.project_id,
    },
    function (err, data) {
      if (err) return next(err);
      if (!data) return res.sendStatus(400);

      data.project = req.body.project;
      data.title = req.body.title;
      data.save(function (err, data) {
        if (err) return next(err);
        res.json(data._id);
      });
    }
  );
});

// get the 18 most recent projects for the home page
router.get("/recent", (req, res, next) => {
  if(req.query.date){
    Data.find()
      .where('createdAt').lt(req.query.date)
      .limit(POSTLIMIT)
      .sort({createdAt: -1})
      .select("username title project createdAt")
      .exec(function (err, data){
        if (err) return next(err);

        res.json({data:data, postlimit: POSTLIMIT});
      })
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
