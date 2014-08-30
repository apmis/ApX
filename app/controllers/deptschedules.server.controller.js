'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Deptschedule = mongoose.model('Deptschedule'),
	_ = require('lodash');

/**
 * Create a Deptschedule
 */
exports.create = function(req, res) {
	var deptschedule = new Deptschedule(req.body);
	deptschedule.user = req.user;

	deptschedule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptschedule);
		}
	});
};

/**
 * Show the current Deptschedule
 */
exports.read = function(req, res) {
	res.jsonp(req.deptschedule);
};

/**
 * Update a Deptschedule
 */
exports.update = function(req, res) {
	var deptschedule = req.deptschedule ;

	deptschedule = _.extend(deptschedule , req.body);

	deptschedule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptschedule);
		}
	});
};

/**
 * Delete an Deptschedule
 */
exports.delete = function(req, res) {
	var deptschedule = req.deptschedule ;

	deptschedule.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptschedule);
		}
	});
};

/**
 * List of Deptschedules
 */
exports.list = function(req, res) { Deptschedule.find().sort('-created').populate('user', 'displayName').exec(function(err, deptschedules) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptschedules);
		}
	});
};

/**
 * Deptschedule middleware
 */
exports.deptscheduleByID = function(req, res, next, id) { Deptschedule.findById(id).populate('user', 'displayName').exec(function(err, deptschedule) {
		if (err) return next(err);
		if (! deptschedule) return next(new Error('Failed to load Deptschedule ' + id));
		req.deptschedule = deptschedule ;
		next();
	});
};

/**
 * Deptschedule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.deptschedule.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};