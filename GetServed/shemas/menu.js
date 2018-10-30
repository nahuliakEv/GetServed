var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

mongoose.Promise = global.Promise;

var menuSchema = new Schema({
    restaurantId: {
        type: ObjectId,
        required: true
    },
    category: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        photos: {
            type: [String]
        },
        dishes: [{
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            photos: {
                type: [String]
            },
            price: {
                type: Number,
                required: true
            },
            serving: {
                type: [String]
            }
        }]
    }]
},
    {
        versionKey: false,
        collection: 'menus'
    });

var Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;