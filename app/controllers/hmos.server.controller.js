'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Hmo = mongoose.model('Hmo'),
	_ = require('lodash');

/**
 * Create a Hmo
 */
exports.create = function(req, res) {
	var hmo = new Hmo(req.body);
	hmo.user = req.user;

	hmo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(hmo);
		}
	});
};

/**
 * Show the current Hmo
 */
exports.read = function(req, res) {
	res.jsonp(req.hmo);
};

/**
 * Update a Hmo
 */
exports.update = function(req, res) {
	var hmo = req.hmo ;

	hmo = _.extend(hmo , req.body);

	hmo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(hmo);
		}
	});
};

/**
 * Delete an Hmo
 */
exports.delete = function(req, res) {
	var hmo = req.hmo ;

	hmo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(hmo);
		}
	});
};

/**
 * List of Hmos
 */
exports.list = function(req, res) { Hmo.find().sort('-created').populate('user', 'displayName').exec(function(err, hmos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(hmos);
		}
	});
};

/**
 * Hmo middleware
 */
exports.hmoByID = function(req, res, next, id) { Hmo.findById(id).populate('user', 'displayName').exec(function(err, hmo) {
		if (err) return next(err);
		if (! hmo) return next(new Error('Failed to load Hmo ' + id));
		req.hmo = hmo ;
		next();
	});
};

/**
 * Hmo authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.hmo.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};