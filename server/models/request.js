var mongoose = require('mongoose');
// 

var requestSchema = new mongoose.Schema({
    name:  { type: String, required: [true, 'name is required'], minlength: [2, 'TOO SHORT']},
    message:  { type: String, required: [true, 'description is required'], minlength: [2, 'TOO SHORT']},
    phone:  { type: String, required: [true, 'phone is required'], minlength: [2, 'TOO SHORT']}
}, {timestamps: true });

var Request = mongoose.model('Request', requestSchema) 
