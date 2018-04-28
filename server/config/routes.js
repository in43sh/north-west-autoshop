var mongoose = require('mongoose');
var session = require('express-session');
var express = require('express');
var path = require('path');

// Controllers
var car = require('./../controllers/cars.js');
var part = require('./../controllers/parts.js');
var request = require('./../controllers/requests.js');

module.exports = function(app) {
	// Cars functions
	app.get("/cars/all", (req, res)=>{
		car.all(req, res)
	});
	app.post("/cars/new", (req, res, next) => {
		car.new(req, res)
	});
	app.post("/cars/delete", (req, res, next) => {
		car.delete(req, res)
	});
	app.post("/cars/edit", (req, res, next) => {
		car.edit(req, res)
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

	// Requests functions
	app.get("/requests/all", (req, res, next) => {
		request.all(req, res)
	});
	app.post("/requests/new", (req, res, next) =>{
		//console.log(req.body);
		request.new(req, res);
	});
	app.post("/requests/delete", (req, res, next) =>{
		request.delete(req, res);
	})
	app.post("/requests/edit", (req, res, next) => {
		request.edit(req, res);
	})











}
// 	console.log("ROUTINGS");
// 	///// users
//   	app.post('/user/new', (req, res, next)=>{
// 	  console.log('recieve, registraion!!!!!!!!!!')
// 	  console.log('----------------------------------')
// 	  user.create(req, res)
// 	});
// 	app.post('/user/login', (req, res, next)=>{
// 	  console.log('recieve, login!!!!!!!!!!')
// 	  console.log('----------------------------------')
// 	  user.login(req, res)
// 	});
// 	app.post("/user/logout", (req, res, next)=>{
// 	  console.log('routes.js: logouting user in session!!!!!!!!!!')
// 	  console.log('----------------------------------')
// 	  user.logout(req, res)
// 	});
// 	app.get("/user/all", (req, res, next)=>{
// 	  console.log('routes.js: retrieveing all users')
// 	  console.log('----------------------------------')
// 	  user.showAll(req, res)
// 	});

// 	////////////////// officials
// 	app.get('/official/everyone', (req, res, next)=>{
// 	  console.log('everyone')
// 	  console.log('----------------------------------')
// 	  official.everyone(req, res)
// 	});
// 	app.post('/official/new', (req, res, next)=>{
// 	  console.log('new official')
// 	  console.log('----------------------------------')
// 	  official.new(req, res)
// 	});
// 	app.get('/official/all', (req, res, next)=>{
// 	  console.log('all officials')
// 	  console.log('----------------------------------')
// 	  official.all(req, res)
// 	});
// 	app.post('/official/find', (req, res, next)=>{
// 	  console.log('all officials')
// 	  console.log('----------------------------------')
// 	  official.find(req, res)
// 	});
// 	app.get('/official/unconfirmed', (req, res, next)=>{
// 	  console.log('all unconfirmed officials')
// 	  console.log('----------------------------------')
// 	  official.unconfirmed(req, res)
// 	});
// 	app.post('/official/confirm', (req, res, next)=>{
// 	  console.log('confirm official')
// 	  console.log('----------------------------------')
// 	  official.confirm(req, res)
// 	});
// 	app.post('/official/filter', (req, res, next)=>{
// 	  console.log('filtering officials')
// 	  console.log('----------------------------------')
// 	  official.filter(req, res)
// 	});
// 	app.post('/official/update', (req, res, next)=>{
// 	  console.log('updating official', req.body._id)
// 	  official.update(req, res)
// 	});
// 	app.post('/official/remove', (req, res, next)=>{
// 	  console.log('removing official', req.body._id)
// 	  official.remove(req, res)
// 	});
// 	///////////////////// promises
// 	app.post('/prom/new', (req, res, next)=>{
// 	  console.log('new prom')
// 	  console.log('----------------------------------')
// 	  prom.new(req, res)
// 	});
// 	app.post('/prom/find', (req, res, next)=>{
// 	  console.log('find promises')
// 	  console.log('----------------------------------')
// 	  prom.find(req, res)
// 	});
// 	app.post('/prom/update', (req, res, next)=>{
// 	  console.log('update promise')
// 	  console.log('----------------------------------')
// 	  prom.update(req, res)
// 	});
	

// 	////requests
// 	app.post('/request/new', (req, res, next)=>{
// 	  console.log('creating a request')
// 	  console.log('----------------------------------')
// 	  request.new(req, res)
// 	});
// 	app.get('/request/all', (req, res, next)=>{
// 	  console.log('find all requests')
// 	  console.log('----------------------------------')
// 	  request.all(req, res)
// 	});
// 	app.post('/request/delete', (req, res, next)=>{
// 	  console.log('delete promise', req.body.id)
// 	  console.log('----------------------------------')
// 	  request.delete(req, res)
// 	});

// 	///////////////////// posts
// 	app.post('/post/create', (req, res, next)=>{
// 	  console.log('new post')
// 	  console.log('----------------------------------')
// 	  post.new(req, res)
// 	});
// 	app.post('/post/find', (req, res, next)=>{
// 	  console.log('find promises')
// 	  console.log('----------------------------------')
// 	  post.find(req, res)
// 	});
// 	app.post('/post/delete', (req, res, next)=>{
// 	  console.log('update promise')
// 	  console.log('----------------------------------')
// 	  post.remove(req, res)
// 	});

// 		///////////////////// comments
// 	app.post('/comment/create', (req, res, next)=>{
// 	  console.log('new comment')
// 	  console.log('----------------------------------')
// 	  comment.new(req, res)
// 	});
// 	app.post('/comment/find', (req, res, next)=>{
// 	  console.log('find promises')
// 	  console.log('----------------------------------')
// 	  comment.find(req, res)
// 	});
// 	app.post('/comment/delete', (req, res, next)=>{
// 	  console.log('update promise')
// 	  console.log('----------------------------------')
// 	  comment.remove(req, res)
// 	});
// };
