var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

mongoose.Promise = global.Promise;

var orderSchema = new Schema({
    bookingId: {
        type: ObjectId,
        required: true
    },
    dishes: [{
        dishId: {
            type: ObjectId,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }]
},
{
    versionKey: false,
    collection: 'orders'
});

var Order = mongoose.model("Order", orderSchema);

module.exports = Order;