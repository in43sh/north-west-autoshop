var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')


var Part = mongoose.model('Part');
module.exports = {
   all: function(req, res){
    console.log("all parts")
    Part.find({})
              .then(data => {
                console.log(data);
                res.json(data);
              })
              .catch(err => {
                res.json(false);
              });
              
    },
    new: function(req, res) {

        console.log("++++++++++++++++++++++++++++++++++++")
        console.log(req.body)
        console.log('+++++++++++++++++++')
        var part = new Part({
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
              res.json(true)
            })
            .catch(err => {
              console.log('saving failed')
              console.log(err)
              res.json(false)
          })
            
  },
  delete: function(req, res){
    Part.remove({_id: req.body.id})
      .then(data=>{
        res.json(true);
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
        res.json(true)
      }else{
        res.json(false)
      }
    })
      
  }

}
