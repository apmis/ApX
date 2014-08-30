'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Insttype = mongoose.model('Insttype'),
	_ = require('lodash');

/**
 * Create a Insttype
 */
exports.create = function(req, res) {
	var insttype = new Insttype(req.body);
	insttype.user = req.user;

	insttype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(insttype);
		}
	});
};

/**
 * Show the current Insttype
 */
exports.read = function(req, res) {
	res.jsonp(req.insttype);
};

/**
 * Update a Insttype
 */
exports.update = function(req, res) {
	var insttype = req.insttype ;

	insttype = _.extend(insttype , req.body);

	insttype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(insttype);
		}
	});
};

/**
 * Delete an Insttype
 */
exports.delete = function(req, res) {
	var insttype = req.insttype ;

	insttype.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(insttype);
		}
	});
};

/**
 * List of Insttypes
 */
exports.list = function(req, res) { Insttype.find().sort('-created').populate('user', 'displayName').exec(function(err, insttypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(insttypes);
		}
	});
};

/**
 * Insttype middleware
 */
exports.insttypeByID = function(req, res, next, id) { Insttype.findById(id).populate('user', 'displayName').exec(function(err, insttype) {
		if (err) return next(err);
		if (! insttype) return next(new Error('Failed to load Insttype ' + id));
		req.insttype = insttype ;
		next();
	});
};

/**
 * Insttype authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.insttype.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};