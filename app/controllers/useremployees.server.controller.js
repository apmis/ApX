'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Useremployee = mongoose.model('Useremployee'),
	_ = require('lodash');

/**
 * Create a Useremployee
 */
exports.create = function(req, res) {
	var useremployee = new Useremployee(req.body);
	useremployee.user = req.user;

	useremployee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(useremployee);
		}
	});
};

/**
 * Show the current Useremployee
 */
exports.read = function(req, res) {
	res.jsonp(req.useremployee);
};

/**
 * Update a Useremployee
 */
exports.update = function(req, res) {
	var useremployee = req.useremployee ;

	useremployee = _.extend(useremployee , req.body);

	useremployee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(useremployee);
		}
	});
};

/**
 * Delete an Useremployee
 */
exports.delete = function(req, res) {
	var useremployee = req.useremployee ;

	useremployee.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(useremployee);
		}
	});
};

/**
 * List of Useremployees
 */
exports.list = function(req, res) { Useremployee.find().sort('-created').populate('user', 'displayName').exec(function(err, useremployees) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(useremployees);
		}
	});
};

/**
 * Useremployee middleware
 */
exports.useremployeeByID = function(req, res, next, id) { Useremployee.findById(id).populate('user', 'displayName').exec(function(err, useremployee) {
		if (err) return next(err);
		if (! useremployee) return next(new Error('Failed to load Useremployee ' + id));
		req.useremployee = useremployee ;
		next();
	});
};

/**
 * Useremployee authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.useremployee.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};