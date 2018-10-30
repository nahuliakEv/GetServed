var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

mongoose.Promise = global.Promise;

var bookingSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    numPeople:{
        type: Number,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    restaurantId: {
        type: ObjectId,
        required: true
    }
},
{
    versionKey: false,
    collection: 'bookings'
});

var Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

