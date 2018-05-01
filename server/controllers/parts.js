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
                // console.log(data);
                res.status(200).json(data);
              })
              .catch(err => {
                res.json(data);
              });
              
    },
    new: function(req, res) {

        // console.log("++++++++++++++++++++++++++++++++++++")
        // console.log(req.body)
        // console.log('+++++++++++++++++++')
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
              res.status(200).json(true)
            })
            .catch(err => {
              console.log('saving failed')
              console.log(err)
              res.json(false)
          })
            
  },
  delete: function(req, res){
    console.log('req.body ---->', req.body);
    console.log('req.body.id ---->', req.body.i);
    Part.remove({_id: req.body.i})
      .then(data=>{
        // console.log(req.body);
        res.status(200).json(true);
      })
      .catch(err=>{
        res.json(false)
      })
  },
  edit: function(req, res){
    Part.findByIdAndUpdate({ _id: req.body.id }, {
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price,
                condition: req.body.condition,
                year: req.body.year,
                description: req.body.description,
                photos: req.body.photos
    }, function(data, err){
      if(data){
        res.status(200).json(true)
      }else{
        res.json(false)
      }
    })
      
  }

}
