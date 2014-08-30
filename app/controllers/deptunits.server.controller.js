'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Deptunit = mongoose.model('Deptunit'),
	_ = require('lodash');

/**
 * Create a Deptunit
 */
exports.create = function(req, res) {
	var deptunit = new Deptunit(req.body);
	deptunit.user = req.user;

	deptunit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptunit);
		}
	});
};

/**
 * Show the current Deptunit
 */
exports.read = function(req, res) {
	res.jsonp(req.deptunit);
};

/**
 * Update a Deptunit
 */
exports.update = function(req, res) {
	var deptunit = req.deptunit ;

	deptunit = _.extend(deptunit , req.body);

	deptunit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptunit);
		}
	});
};

/**
 * Delete an Deptunit
 */
exports.delete = function(req, res) {
	var deptunit = req.deptunit ;

	deptunit.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptunit);
		}
	});
};

/**
 * List of Deptunits
 */
exports.list = function(req, res) { Deptunit.find().sort('-created').populate('user', 'displayName').exec(function(err, deptunits) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptunits);
		}
	});
};

/**
 * Deptunit middleware
 */
exports.deptunitByID = function(req, res, next, id) { Deptunit.findById(id).populate('user', 'displayName').exec(function(err, deptunit) {
		if (err) return next(err);
		if (! deptunit) return next(new Error('Failed to load Deptunit ' + id));
		req.deptunit = deptunit ;
		next();
	});
};

/**
 * Deptunit authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.deptunit.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};