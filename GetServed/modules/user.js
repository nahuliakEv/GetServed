var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userSchema = new Schema({
    id: Number,
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true,
        min: 4
    },
    type: {
        type: String,
        default: "Client"
    }
},
{
    versionKey: false
}
);

var User = mongoose.model('User', userSchema);

module.exports = User;