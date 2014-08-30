'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Institution = mongoose.model('Institution'),
	_ = require('lodash');

/**
 * Create a Institution
 */
exports.create = function(req, res) {
	var institution = new Institution(req.body);
	institution.user = req.user;

	institution.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(institution);
		}
	});
};

/**
 * Show the current Institution
 */
exports.read = function(req, res) {
	res.jsonp(req.institution);
};

/**
 * Update a Institution
 */
exports.update = function(req, res) {
	var institution = req.institution ;

	institution = _.extend(institution , req.body);

	institution.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(institution);
		}
	});
};

/**
 * Delete an Institution
 */
exports.delete = function(req, res) {
	var institution = req.institution ;

	institution.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(institution);
		}
	});
};

/**
 * List of Institutions
 */
exports.list = function(req, res) { Institution.find().sort('-created').populate('user', 'displayName').exec(function(err, institutions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(institutions);
		}
	});
};

/**
 * Institution middleware
 */
exports.institutionByID = function(req, res, next, id) { Institution.findById(id).populate('user', 'displayName').exec(function(err, institution) {
		if (err) return next(err);
		if (! institution) return next(new Error('Failed to load Institution ' + id));
		req.institution = institution ;
		next();
	});
};

/**
 * Institution authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.institution.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};