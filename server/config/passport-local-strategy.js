const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user.model");
//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding user --> Passport");
          return done(err);
        });
    }
  )
);

module.exports = passport;