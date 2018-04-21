var mongoose = require('mongoose');
// 

var carSchema = new mongoose.Schema({
    brand:  { type: String, required: [true, 'Brand is required']},
    model:  { type: String, required: [true, 'Model is required']},
    price:  { type: Number },
    year:  { type: Number},
    color:  { type: String, required: [true, 'Color is required']},
    mileage:  { type: Number},
    description: {type: String},
    photos: { type: Array, "default" : []}
}, {timestamps: true });

var Car = mongoose.model('Car', carSchema) 
