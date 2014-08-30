'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Instmodule = mongoose.model('Instmodule'),
	_ = require('lodash');

/**
 * Create a Instmodule
 */
exports.create = function(req, res) {
	var instmodule = new Instmodule(req.body);
	instmodule.user = req.user;

	instmodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instmodule);
		}
	});
};

/**
 * Show the current Instmodule
 */
exports.read = function(req, res) {
	res.jsonp(req.instmodule);
};

/**
 * Update a Instmodule
 */
exports.update = function(req, res) {
	var instmodule = req.instmodule ;

	instmodule = _.extend(instmodule , req.body);

	instmodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instmodule);
		}
	});
};

/**
 * Delete an Instmodule
 */
exports.delete = function(req, res) {
	var instmodule = req.instmodule ;

	instmodule.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instmodule);
		}
	});
};

/**
 * List of Instmodules
 */
exports.list = function(req, res) { Instmodule.find().sort('-created').populate('user', 'displayName').exec(function(err, instmodules) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(instmodules);
		}
	});
};

/**
 * Instmodule middleware
 */
exports.instmoduleByID = function(req, res, next, id) { Instmodule.findById(id).populate('user', 'displayName').exec(function(err, instmodule) {
		if (err) return next(err);
		if (! instmodule) return next(new Error('Failed to load Instmodule ' + id));
		req.instmodule = instmodule ;
		next();
	});
};

/**
 * Instmodule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.instmodule.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};