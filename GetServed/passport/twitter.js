var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../modules/user');

module.exports = (passport) => {
    passport.use('twitter', new TwitterStrategy({
        // consumerKey     : twitterConfig.apikey,
        // consumerSecret  : twitterConfig.apisecret,
        // callbackURL     : twitterConfig.callbackURL
    },
        function(token, tokenSecret, profile, done) {

        findOrCreateUser = () => {

            User.findOne({'twitter.id' : profile.id}, (err, user) => {
                if(err){
                    console.log(err);
                    return done(err);
                }
                if(user){
                    console.log("User found.");
                    return done(null, user);
                } else {
                    var newUser = new User();
                    
                    newUser.twitter.id  = profile.id;
	                newUser.twitter.token = token;
	                newUser.twitter.username = profile.username;
	                newUser.twitter.displayName = profile.displayName;
                    
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