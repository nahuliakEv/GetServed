var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userSchema = new Schema({

    fb: {
        id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String
    },

    twitter: {
		id: String,
		token: String,
		username: String,
        displayName: String 
       },
    
    local: {
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
    }
},
{
    versionKey: false
}
);

var User = mongoose.model('User', userSchema);

module.exports = User;