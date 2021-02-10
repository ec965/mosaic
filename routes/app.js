const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Data = require("../models/data");
const User = require('../models/users');

// READ
// get all a user's data
// or get recent content from any user
router.get("/projects", (req, res, next) => {
  let date = Date.now();
  let username = null;
  let postlimit = 4;
  // get query params
  if (req.query.date) date = req.query.date;
  if (req.query.username) username = req.query.username;
  if(req.query.postlimit) postlimit = req.query.postlimit;

  // query the database
  if (username !== null){
    Data.find()
      .where('updatedAt').lt(date)
      .where('username').equals(username)
      .limit(postlimit)
      .sort({updatedAt: -1})
      .select("username title project updatedAt")
      .exec(function (err, data) {
        if(err) return next(err);

        User.findOne({username: req.query.username}, 'username createdAt', function(err, user){
          if (err) return next(err);

          if (!user ) return res.sendStatus(404);

          res.json({ user: user, data: data, postlimit: postlimit});
        })

      })
  } else {
    Data.find()
      .where('createdAt').lt(date)
      .limit(postlimit)
      .sort({updatedAt: -1})
      .select("username title project updatedAt")
      .exec(function (err, data) {
        if(err) return next(err);

        res.json({ data: data, postlimit: postlimit});
      })
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


// DELETE
// delete data of id
router.delete("/delete", (req, res, next) => {
  if (req.query.id) {
    Data.deleteOne(
      { _id: req.query.id, username: req.user.username },
      function (err, result) {
        if (err) return next(err);

        if (res) {
          res.sendStatus(200);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;