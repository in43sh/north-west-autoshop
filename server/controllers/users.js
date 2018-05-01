var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var User = mongoose.model("User");
module.exports = {
  register: (req, res) => {
    // console.log("++++++++++++++++++++++++++++++++++++")
    console.log('req.body ---->', req.bodyrs)
    // console.log('+++++++++++++++++++')
    const { username, password } = req.body;
    const user = new User({
      username: username,
      password: password
    });
    req.session.user = { username };
    user
      .save()
      .then(saved => {
        console.log("saved!");
        res.status(200).json({ user: req.session.user });
      })
      .catch(err => {
        console.log("saving failed");
        console.log(err);
        res.status(500).json(false);
      });
  },
  login: (req, res) => {
    User.findOne({ username: req.body.username })
      .then(data => {
        // console.log(data);
        req.session.user = { username: data.username };
        res.status(200).json( req.session.user );
      })
      .catch(err => {
        res.status(500).json(false);
      });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send();
  },
  getUserData: (req, res, next) => {
    // console.log('req.session ->', req.session)
    res.json({ user: req.session.user })
  },
  all: (req, res) => {
    // console.log("all cars")
    Car.find({})
      .then(data => {
        // console.log(data);
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(false);
      });
  }
};
