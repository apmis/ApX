'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Empmodule = mongoose.model('Empmodule'),
	_ = require('lodash');

/**
 * Create a Empmodule
 */
exports.create = function(req, res) {
	var empmodule = new Empmodule(req.body);
	empmodule.user = req.user;

	empmodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(empmodule);
		}
	});
};

/**
 * Show the current Empmodule
 */
exports.read = function(req, res) {
	res.jsonp(req.empmodule);
};

/**
 * Update a Empmodule
 */
exports.update = function(req, res) {
	var empmodule = req.empmodule ;

	empmodule = _.extend(empmodule , req.body);

	empmodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(empmodule);
		}
	});
};

/**
 * Delete an Empmodule
 */
exports.delete = function(req, res) {
	var empmodule = req.empmodule ;

	empmodule.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(empmodule);
		}
	});
};

/**
 * List of Empmodules
 */
exports.list = function(req, res) { Empmodule.find().sort('-created').populate('user', 'displayName').exec(function(err, empmodules) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(empmodules);
		}
	});
};

/**
 * Empmodule middleware
 */
exports.empmoduleByID = function(req, res, next, id) { Empmodule.findById(id).populate('user', 'displayName').exec(function(err, empmodule) {
		if (err) return next(err);
		if (! empmodule) return next(new Error('Failed to load Empmodule ' + id));
		req.empmodule = empmodule ;
		next();
	});
};

/**
 * Empmodule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.empmodule.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};