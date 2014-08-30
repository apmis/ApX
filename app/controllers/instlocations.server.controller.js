'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Instlocation = mongoose.model('Instlocation'),
	_ = require('lodash');

/**
 * Create a Instlocation
 */
exports.create = function(req, res) {
	var instlocation = new Instlocation(req.body);
	instlocation.user = req.user;

	instlocation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instlocation);
		}
	});
};

/**
 * Show the current Instlocation
 */
exports.read = function(req, res) {
	res.jsonp(req.instlocation);
};

/**
 * Update a Instlocation
 */
exports.update = function(req, res) {
	var instlocation = req.instlocation ;

	instlocation = _.extend(instlocation , req.body);

	instlocation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instlocation);
		}
	});
};

/**
 * Delete an Instlocation
 */
exports.delete = function(req, res) {
	var instlocation = req.instlocation ;

	instlocation.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instlocation);
		}
	});
};

/**
 * List of Instlocations
 */
exports.list = function(req, res) { Instlocation.find().sort('-created').populate('user', 'displayName').exec(function(err, instlocations) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instlocations);
		}
	});
};

/**
 * Instlocation middleware
 */
exports.instlocationByID = function(req, res, next, id) { Instlocation.findById(id).populate('user', 'displayName').exec(function(err, instlocation) {
		if (err) return next(err);
		if (! instlocation) return next(new Error('Failed to load Instlocation ' + id));
		req.instlocation = instlocation ;
		next();
	});
};

/**
 * Instlocation authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.instlocation.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};