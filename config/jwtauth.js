/**
 * jwtauth
 *
 *  A simple middleware for parsing a JWt token attached to the request. If the token is valid, the corresponding user
 *  will be attached to the request.
 */
'use strict';
var url = require('url'),
mongoose = require('mongoose'),
  User = require ('../app/models/user.server.model'),
    User = mongoose.model('User'),
    jwt = require('jwt-simple'),
    http=require ('http'),
    path = require('path');

   //app = require('./express');


module.exports = function(req, res, next){


//    register_models = require('./register_models');
//
//    register_models();
//
//    Kitten          = mongoose.model('Kitten'),
	// Parse the URL, we might need this
	//var parsed_url = url.parse(req.originalUrl, true);

	/**
	 * Take the token from:
	 * 
	 *  - the POST value access_token
	 *  - the GET parameter access_token
	 *  - the x-access-token header
	 *    ...in that order.
	 */
//var apmis345= req.headers.Authorization;
    //console.log(req.toJSON);
//        if (req){
//            console.log('req exists');
//            console.log(req.headers);
//            console.log(req.body);
//            console.log(req.query);
//        }
	var token = req.headers.authorization; //(req.body && req.body.access_token) || req.query.access_token ||
console.log('token parsing called');

	if (token) {

		try {
			var decoded = jwt.decode(token, 'simpadania');
                console.log('token decoded');
                console.log(decoded);
			if (decoded.exp <= Date.now()) {
				res.end('Access token has expired', 400);
			}

			User.findOne({ '_id': decoded.iss }, function(err, user){

				if (!err) {					
					req.user = user;
                    console.log('user found');
					return next();
				}

			});

		} catch (err) {
            console.log(err);
            console.log('error from try and catch for token');
            res.status(500);
            res.end();
//			return next();
		}

	} else {
        res.status(401);
        console.log('aunthorized: no token');

		next();

	}
};
