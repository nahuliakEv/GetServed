var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../modules/user');

module.exports = (passport) => {
    passport.use('google', new GoogleStrategy({
        clientID: "625859847152-1vmh3kbbnkhraqa992ptf7v7253lroav.apps.googleusercontent.com",
        clientSecret: "eo9L8EioVxOfCxSk5n6r_OPO",
        //callbackURL: "https://getserved20181024044343.azurewebsites.net/login/google/callback"
        callbackURL: "http://localhost:3000/login/google/callback"
    },
        function(token, refreshToken, profile, done) {

        findOrCreateUser = () => {

            User.findOne({'google.id' : profile.id}, (err, user) => {
                if(err){
                    console.log(err);
                    return done(err);
                }
                if(user){
                    console.log("User found.");
                    return done(null, user);
                } else {
                    var newUser = new User();
                    
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value;
                    
                    newUser.save((err) => {
                        if(err){
                            console.log('Error in saving user.');
                            throw err;
                        }
                        console.log("Registration succesfull");
                        return done(null, newUser);
                    })
                }
            })
        }
    process.nextTick(findOrCreateUser);
    })
    )
}