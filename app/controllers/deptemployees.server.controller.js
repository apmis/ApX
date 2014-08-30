'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Deptemployee = mongoose.model('Deptemployee'),
	_ = require('lodash');

/**
 * Create a Deptemployee
 */
exports.create = function(req, res) {
	var deptemployee = new Deptemployee(req.body);
	deptemployee.user = req.user;

	deptemployee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptemployee);
		}
	});
};

/**
 * Show the current Deptemployee
 */
exports.read = function(req, res) {
	res.jsonp(req.deptemployee);
};

/**
 * Update a Deptemployee
 */
exports.update = function(req, res) {
	var deptemployee = req.deptemployee ;

	deptemployee = _.extend(deptemployee , req.body);

	deptemployee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptemployee);
		}
	});
};

/**
 * Delete an Deptemployee
 */
exports.delete = function(req, res) {
	var deptemployee = req.deptemployee ;

	deptemployee.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptemployee);
		}
	});
};

/**
 * List of Deptemployees
 */
exports.list = function(req, res) { Deptemployee.find().sort('-created').populate('user', 'displayName').exec(function(err, deptemployees) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deptemployees);
		}
	});
};

/**
 * Deptemployee middleware
 */
exports.deptemployeeByID = function(req, res, next, id) { Deptemployee.findById(id).populate('user', 'displayName').exec(function(err, deptemployee) {
		if (err) return next(err);
		if (! deptemployee) return next(new Error('Failed to load Deptemployee ' + id));
		req.deptemployee = deptemployee ;
		next();
	});
};

/**
 * Deptemployee authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.deptemployee.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};