var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require("bcrypt-nodejs");
var User = require("../modules/user");


module.exports = (passport) => {
    passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
        (request, email, password, done) => {
            User.findOne({ 'email': email },
                (err, user) => {
                    if (err) return done(err);
                    if (!user) {
                        console.log("User not found!");
                        return done(null, false, request.flash('message', 'User not found.'));
                    }
                    if (!isValidPassword(user, password)) {
                        console.log("Invalid password");
                        return done(null, false, request.flash('message', 'Invalid password.'));
                    }

                    return done(null, user);
                }
            )

        })

    )

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }
}
