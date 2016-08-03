var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = new mongoose.model('Movie',MovieSchema);

module.exports= Movie;

