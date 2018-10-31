var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.Promise = global.Promise;

var restaurantSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
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
    maxSeatsTable: {
        type: Number,
        required: true
    },
    facilities: {
            cash: Boolean,
            cads: Boolean,
            alcohol: Boolean,
            seats: Boolean,
            cond: Boolean,
            nonVeg: Boolean
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