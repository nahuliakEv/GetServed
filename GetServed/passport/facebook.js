var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../modules/user');

module.exports = (passport) => {
    passport.use('facebook', new FacebookStrategy({
        clientID: '693430381038606',
        clientSecret: 'a7adba3e0f46ab883b56f78ee9427e3e',
        callbackURL: 'https://localhost:3000/login/facebook/callback'
    },
        function(access_token, refresh_token, profile, done) {

        findOrCreateUser = () => {

            User.findOne({'id': profile.id}, (err, user) => {
                if(err){
                    console.log(err);
                    return done(err);
                }
                if(user){
                    console.log("User found.");
                    return done(null, user);
                } else {
                    var newUser = new User();
                    
                    newUser.fb.id = profile.id;
                    newUser.fb.access_token = access_token;
	                newUser.fb.firstName  = profile.name.givenName;
	                newUser.fb.lastName = profile.name.familyName;
	                newUser.fb.email = profile.emails[0].value; 
                    newUser.fb.pincode = request.body.pincode;

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