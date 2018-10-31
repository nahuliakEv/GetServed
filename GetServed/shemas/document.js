var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.Promise = global.Promise;

var documentSchema = new Schema({

    path: { 
        type: String 
    },
    filename: { 
        type: String 
    },
    restaurantId: { 
        type: ObjectId 
    },
    link: {
        type: String
    }},
    {
        versionKey: false,
        collection: 'documents'
    });
  
  module.exports = mongoose.model('Document', documentSchema);