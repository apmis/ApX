'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Retcompany = mongoose.model('Retcompany'),
	_ = require('lodash');

/**
 * Create a Retcompany
 */
exports.create = function(req, res) {
	var retcompany = new Retcompany(req.body);
	retcompany.user = req.user;

	retcompany.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(retcompany);
		}
	});
};

/**
 * Show the current Retcompany
 */
exports.read = function(req, res) {
	res.jsonp(req.retcompany);
};

/**
 * Update a Retcompany
 */
exports.update = function(req, res) {
	var retcompany = req.retcompany ;

	retcompany = _.extend(retcompany , req.body);

	retcompany.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(retcompany);
		}
	});
};

/**
 * Delete an Retcompany
 */
exports.delete = function(req, res) {
	var retcompany = req.retcompany ;

	retcompany.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(retcompany);
		}
	});
};

/**
 * List of Retcompanies
 */
exports.list = function(req, res) { Retcompany.find().sort('-created').populate('user', 'displayName').exec(function(err, retcompanies) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(retcompanies);
		}
	});
};

/**
 * Retcompany middleware
 */
exports.retcompanyByID = function(req, res, next, id) { Retcompany.findById(id).populate('user', 'displayName').exec(function(err, retcompany) {
		if (err) return next(err);
		if (! retcompany) return next(new Error('Failed to load Retcompany ' + id));
		req.retcompany = retcompany ;
		next();
	});
};

/**
 * Retcompany authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.retcompany.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};