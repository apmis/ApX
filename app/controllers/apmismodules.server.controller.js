'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Apmismodule = mongoose.model('Apmismodule'),
	_ = require('lodash');

/**
 * Create a Apmismodule
 */
exports.create = function(req, res) {
//   if (res.status>399) {
//       console.log('calling create function');
//   }
	var apmismodule = new Apmismodule(req.body);
	  //apmismodule.user = req.user;

	apmismodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            //res.status(200)
			res.jsonp(apmismodule);
		}
	});
};

/**
 * Show the current Apmismodule
 */
exports.read = function(req, res) {
	res.jsonp(req.apmismodule);
};

/**
 * Update a Apmismodule
 */
exports.update = function(req, res) {
	var apmismodule = req.apmismodule ;

	apmismodule = _.extend(apmismodule , req.body);

	apmismodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(apmismodule);
		}
	});
};

/**
 * Delete an Apmismodule
 */
exports.delete = function(req, res) {
	var apmismodule = req.apmismodule ;

	apmismodule.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(apmismodule);
		}
	});
};

/**
 * List of Apmismodules
 */
exports.list = function(req, res) { Apmismodule.find().sort('-created').exec(function(err, apmismodules) {//.populate('user', 'displayName')
	console.log('iam here')	;
    if (err) {
            console.log('error with list of modules: error 400');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            console.log('success: list of modules');
            res.status(200);
			res.jsonp(apmismodules) ;
		}
	});
};

/**
 * Apmismodule middleware
 */
exports.apmismoduleByID = function(req, res, next, id) { Apmismodule.findById(id).populate('user', 'displayName').exec(function(err, apmismodule) {
		if (err) return next(err);
		if (! apmismodule) return next(new Error('Failed to load Apmismodule ' + id));
		req.apmismodule = apmismodule ;
		next();
	});
};

/**
 * Apmismodule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.apmismodule.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};