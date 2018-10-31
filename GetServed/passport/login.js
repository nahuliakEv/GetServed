var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require("bcrypt-nodejs");
var User = require("../shemas/user");


module.exports = (passport) => {
    passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
        (request, email, password, done) => {
            User.findOne({ 'local.email': email },
                (err, user) => {
                    if (err) return done(err);
                    if (!user) {
                        console.log("User not found!");
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) {
                        console.log("Invalid password");
                        return done(null, false);
                    }

                    return done(null, user);
                }
            )
        })
    )

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.local.password);
    }
}
