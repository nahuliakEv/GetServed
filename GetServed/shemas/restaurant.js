var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.Promise = global.Promise;

var restaurantSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    location: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        postcode: {
            type: Number,
            required: true
        },
    },
    coordinates: {
        lat: {
            type: Number,
            required: true},
        lng: {
            type: Number,
            required: true}
    },
    tablesCount: {
        type:Number,
        required: true
    },
    maxSitsTable: {
        type: Number,
        required: true
    },
    facilities: {
        type: [String],
        required: true
    },
    cuisines: {
        type: [String],
        required: true
    },
    approxCost: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    famousFor: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: [String],
        required: true
    },
    ownerId: {
        type: ObjectId,
        required: true
    },
},
{
    versionKey: false,
    collection: 'restaurants'
} 
)

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;