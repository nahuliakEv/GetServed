var LocalStrategy = require("passport-local").Strategy;
var User = require("../shemas/user");
var bCrypt = require("bcrypt-nodejs");

module.exports = (passport) => {
    passport.use("registration", new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
        function(request, email, password, done) {

            findOrCreateUser = () => {

                User.findOne({'local.email': email}, (err, user) => {
                    if(err){
                        console.log(err);
                        return done(err);
                    }
                    if(user){
                        console.log("User already exists with this email.");
                        return done(null, false);
                    } else {
                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = createHash(password);
                        newUser.local.fullName = request.body.fullName;
                        newUser.local.pincode = request.body.pincode;

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

    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
    
}