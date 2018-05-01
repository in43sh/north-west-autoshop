var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')


var Car = mongoose.model('Car');
module.exports = {
   all: function(req, res){
    // console.log("all cars")
    Car.find({})
              .then(data => {
                // console.log(data);
                res.status(200).json(data);
              })
              .catch(err => {
                res.status(500).json(false);
              });
              
    },
    find: function(req, res){
      // console.log("all cars")
      Car.findOne({_id: req.body._id})
                .then(data => {
                  // console.log(data);
                  res.status(200).json(data);
                })
                .catch(err => {
                  res.status(500).json(false);
                });
                
      },

    new: function(req, res) {

        // console.log("++++++++++++++++++++++++++++++++++++")
        // console.log(req.body)
        // console.log('+++++++++++++++++++')
        var car = new Car({
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price,
                color: req.body.color,
                year: req.body.year,
                mileage: req.body.mileage,
                description: req.body.description,
                photos: req.body.photos
              });
          car.save()
            .then(saved => {
              console.log('saved!')
              res.status(200).json(true)
            })
            .catch(err => {
              console.log('saving failed')
              console.log(err)
              res.status(500).json(false)
          })
            
  },
  delete: function(req, res){
    Car.remove({_id: req.body.id})
      .then(data=>{
        res.status(200).json(true);
      })
      .catch(err=>{
        res.status(500).json(false)
      })
  },
  edit: function(req, res){
    Car.findByIdAndUpdate({ _id: req.body.id }, {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        color: req.body.color,
        year: req.body.year,
        mileage: req.body.mileage,
        description: req.body.description,
        photos: req.body.photos
    }, function(data, err){
      if(data){
        res.status(200).json(true)
      }else{
        res.status(500).json(false)
      }
    })
      
  }

}
