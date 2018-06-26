var mongoose = require('mongoose');
var session = require('express-session');
var express = require('express');
var path = require('path');
const app = express();
const multer =  require('multer');
const AWS = require('aws-sdk');
require('dotenv').config();

// AWS uploader
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});
const s3 = new AWS.S3();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 52428800
  }
})

// Controllers
var car = require('./../controllers/cars.js');
var part = require('./../controllers/parts.js');
var request = require('./../controllers/requests.js');
var user = require('./../controllers/users.js');

module.exports = function(app) {
	// Cars functions
	app.get("/cars/all", (req, res)=>{
		car.all(req, res)
	});
	app.post("/cars/new", (req, res, next) => {
		car.new(req, res)
	});
	app.post("/cars/find", (req, res, next) => {
		car.find(req, res)
	});
	app.post("/cars/delete", (req, res, next) => {
		car.delete(req, res)
	});
	app.post("/cars/edit", (req, res, next) => {
		car.edit(req, res)
	});
	app.post("/cars/edit/photo", (req, res, next) => {
		car.editPhoto(req, res)
	});


	// Parts functions
	app.get("/parts/all", (req, res, next)=>{
		part.all(req, res)
	});
	app.post("/parts/new", (req, res, next) => {
		part.new(req, res)
	})
	app.post("/parts/delete", (req, res, next) => {
		part.delete(req, res)
	})
	app.post("/parts/edit", (req, res, next) => {
		part.edit(req, res)
	})
	app.post("/parts/find", (req, res, next) => {
		part.find(req, res)
	});
	// Requests functions
	app.get("/requests/all", (req, res, next) => {
		request.all(req, res)
	});
	app.post("/requests/new", (req, res, next) =>{
		request.new(req, res);
	});
	app.post("/requests/delete", (req, res, next) =>{
		request.delete(req, res);
	})
	app.post("/requests/edit", (req, res, next) => {
		request.edit(req, res);
	})

	// Users functions
	app.post('/register', (req, res, next)=>{
		user.register(req, res)
	});
	app.post('/login', (req, res, next)=>{
		user.login(req, res)
	});
	app.post("/user/logout", (req, res, next)=>{
		user.logout(req, res)
	});
	app.get("/user/data", (req, res, next)=>{
		user.getUserData(req, res)
	});
	app.get("/user/all", (req, res, next)=>{
		user.all(req, res)
	});

	app.post('/api/upload/:x/:id', upload.single('item'), (req, res) => {
		console.log(req.file);
		var params = {
			Bucket: process.env.BUCKET,
			Key: req.file.originalname, 
			Body: req.file.buffer,
			ContentType: "image/png",
			ACL: 'public-read'
		}
		// s3.putObject() puts the image to the AWS bucket. If the file is already there
		// it won't give any error, just make view that file is uploaded again though
		// it just checked if it's in there
		s3.putObject(params, (err) => { 
			// console.log(err);
			if (err) return res.status(400).send(err);
		})
		var imageUrl = 'https://s3.amazonaws.com/' + params.Bucket + '/'+ params.Key
		var send = {
			id: req.params.id,
			imageUrl: imageUrl
		}
		console.log("+++++++++++++++++++++++++");
		// console.log(req.params);
		if(req.params.x=="cars"){
			car.addPhoto(send);
		}else if(req.params.x=="parts"){
			part.addPhoto(send);
		}
		res.status(200).send(imageUrl);
	});

	app.delete('/api/delete/:key', (req, res, next) => {
		// Parameters for the S3 delete method. The bucket and file name is needed.
		const params = { 
			Bucket: process.env.BUCKET, 
			Key: req.params.key
		};
	
		// Deletes object from S3
		s3.deleteObject(params, (error, data) => {
			// If there's an error return the error
			if (error) return res.json({ error });
	
			if(data) return res.json({data})
		});
	});

	
}

