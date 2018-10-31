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
        photo: {
            type: String,
            required: true
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
            photo: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            serving: {
                type: [String]
            },
            speciality: {
                type: Boolean,
                required: true
            },
            spiceLevel: {
                type: String
            },
            nonVegan: {
                type: Boolean
            },
            vegan: {
                type: Boolean
            },
            containsEgg: {
                type: Boolean
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