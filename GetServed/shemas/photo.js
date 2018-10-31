var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var photoSchema = new Schema({

    path: { 
        type: String 
    },
    filename: { 
        type: String 
    },
    link: {
        type: String
    }},
    {
        versionKey: false,
        collection: 'photos'
    });
  
  module.exports = mongoose.model('Photos', photoSchema);