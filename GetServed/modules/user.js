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

    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    
    local: {
        id: Number,
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    pincode: {
        type: Number,
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