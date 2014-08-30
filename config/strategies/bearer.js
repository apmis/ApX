'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	BearerStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
    /*
     * Bearer strategy for token authentication when accessing API endpoints
     */
//    passport.use(new BearerStrategy(
//        function(token, done){
//            try {
//                //we attempt to decode the token the user sends with his requests
//                var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
//
//                //TODO: must check the token expiry and ensure the token is still valid
//                //if token is expired return 401! (throw an exception, will be caught by catch clause)
//                if (decoded.exp <= Date.now()) {
//                    res.end('Access token has expired', 400)
//                }
//                //we find the user that has made the request
//                User.findOne({ email: decoded.sub }, function (err, user) {
//                    if (err) { return done(err); }
//                    if (!user) {
//                        return done(null, false); //no such user
//                    }
//                    else {
//                        return done(null, user); //allows the call chain to continue to the intented route
//                    }
//                });
//            }
//            catch(err){
//                return done(null, false); //returns a 401 to the caller
//            }
//        }
//    ));
};