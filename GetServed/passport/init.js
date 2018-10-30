var login = require("./login");
var registration = require("./registration");
var facebook = require('./facebook');
var twitter = require('./twitter');
var google = require('./google');
var User = require("../shemas/user");

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ',user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });
    
    login(passport);
    registration(passport);
    facebook(passport);
    twitter(passport);
    google(passport);
}
