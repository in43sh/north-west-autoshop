var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')


var Part = mongoose.model('Part');
module.exports = {
   all: function(req, res){
    // console.log("all parts")
    Part.find({})
              .then(data => {
                res.status(200).json(data);
              })
              .catch(err => {
                res.json(data);
              });
              
    },
    new: function(req, res) {
        var part = new Part({
                title: req.body.title,
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price,
                condition: req.body.condition,
                year: req.body.year,
                description: req.body.description,
                photos: req.body.photos
              });
          part.save()
            .then(saved => {
              console.log('saved!')
              res.json(saved);
            })
            .catch(err => {
              console.log('saving failed')
              console.log(err)
              res.json(false)
          })
            
  },
  find: function(req, res) {
    Part.findOne({ _id: req.body._id })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json(false);
      });
  },
  delete: function(req, res){
    console.log('req.body ---->', req.body);
    console.log('req.body.id ---->', req.body.id);
    Part.remove({_id: req.body.id})
      .then(data=>{
        // console.log(req.body);
        res.status(200).json(true);
      })
      .catch(err=>{
        res.json(false)
      })
  },
  edit: function(req, res){
    Part.findByIdAndUpdate({ _id: req.body.temp_id }, {
                title: req.body.title,
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price,
                condition: req.body.condition,
                year: req.body.year,
                description: req.body.description,
                photos: req.body.photos
    }, function(err, data){
      if(err){
        console.log("can't delete")
        console.log(err);
        res.json(false)
      }else{
        console.log("the part was deleted")
        console.log(data);
        res.status(200).json(true)
      }
    }) 
  },
  addPhoto: function(params){
    console.log(params);
    Part.findByIdAndUpdate({ _id: params.id }, {
                $push: {photos: params.imageUrl}
    }, function(err, data){
      if(err){
        console.log("can't edit")
        console.log(err);
        res.json(false)
      }else{
        console.log("Photos are uploaded!")
        console.log(data);
      }
    }) 
  }

}
