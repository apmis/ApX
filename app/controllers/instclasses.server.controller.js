'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Instclass = mongoose.model('Instclass'),
	_ = require('lodash');

/**
 * Create a Instclass
 */
exports.create = function(req, res) {
	var instclass = new Instclass(req.body);
	instclass.user = req.user;

	instclass.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instclass);
		}
	});
};

/**
 * Show the current Instclass
 */
exports.read = function(req, res) {
	res.jsonp(req.instclass);
};

/**
 * Update a Instclass
 */
exports.update = function(req, res) {
	var instclass = req.instclass ;

	instclass = _.extend(instclass , req.body);

	instclass.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instclass);
		}
	});
};

/**
 * Delete an Instclass
 */
exports.delete = function(req, res) {
	var instclass = req.instclass ;

	instclass.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instclass);
		}
	});
};

/**
 * List of Instclasses
 */
exports.list = function(req, res) { Instclass.find().sort('-created').populate('user', 'displayName').exec(function(err, instclasses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instclasses);
		}
	});
};

/**
 * Instclass middleware
 */
exports.instclassByID = function(req, res, next, id) { Instclass.findById(id).populate('user', 'displayName').exec(function(err, instclass) {
		if (err) return next(err);
		if (! instclass) return next(new Error('Failed to load Instclass ' + id));
		req.instclass = instclass ;
		next();
	});
};

/**
 * Instclass authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.instclass.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};