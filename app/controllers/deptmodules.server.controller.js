'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Deptmodule = mongoose.model('Deptmodule'),
	_ = require('lodash');

/**
 * Create a Deptmodule
 */
exports.create = function(req, res) {
	var deptmodule = new Deptmodule(req.body);
	deptmodule.user = req.user;

	deptmodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptmodule);
		}
	});
};

/**
 * Show the current Deptmodule
 */
exports.read = function(req, res) {
	res.jsonp(req.deptmodule);
};

/**
 * Update a Deptmodule
 */
exports.update = function(req, res) {
	var deptmodule = req.deptmodule ;

	deptmodule = _.extend(deptmodule , req.body);

	deptmodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptmodule);
		}
	});
};

/**
 * Delete an Deptmodule
 */
exports.delete = function(req, res) {
	var deptmodule = req.deptmodule ;

	deptmodule.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptmodule);
		}
	});
};

/**
 * List of Deptmodules
 */
exports.list = function(req, res) { Deptmodule.find().sort('-created').populate('user', 'displayName').exec(function(err, deptmodules) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptmodules);
		}
	});
};

/**
 * Deptmodule middleware
 */
exports.deptmoduleByID = function(req, res, next, id) { Deptmodule.findById(id).populate('user', 'displayName').exec(function(err, deptmodule) {
		if (err) return next(err);
		if (! deptmodule) return next(new Error('Failed to load Deptmodule ' + id));
		req.deptmodule = deptmodule ;
		next();
	});
};

/**
 * Deptmodule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.deptmodule.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};