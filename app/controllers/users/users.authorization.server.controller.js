'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');
/**
 * THe JWT middleware
 */
//var jwtauth = require('../../jwtauth');
/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req,res,next) {
    // validate token here
    // jwtauth();
    if (!req.isAuthenticated()) {
        if (!req.user)
            return res.status(401).send({
                message: 'User is not logged in'
            });
//	}

        next();
    }
};
/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
// validate roles here
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};