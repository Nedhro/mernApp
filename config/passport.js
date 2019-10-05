<<<<<<< HEAD
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/key');

const opts = {};
=======
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/key");

const opts = {};
//
>>>>>>> ebccb2827c4d45fae653ca729c02bf2508fea238
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
<<<<<<< HEAD
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
=======
        new jwtStrategy(opts, (jwt_payload, done) => {
            console.log(jwt_payload);
>>>>>>> ebccb2827c4d45fae653ca729c02bf2508fea238
        })
    );
};