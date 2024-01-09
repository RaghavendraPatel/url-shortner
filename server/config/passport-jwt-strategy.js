const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user.model");

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET||'secret',
};

passport.use(
    new JwtStrategy(opts, function (jwtPayload, done) {
        console.log(jwtPayload);
        User.findById(jwtPayload.user._id).populate('urls').select('-password')
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => {
                return done(err, false);
            });
    })
);

module.exports = passport;