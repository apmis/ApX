'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Department = mongoose.model('Department'),
	_ = require('lodash');

/**
 * Create a Department
 */
exports.create = function(req, res) {
	var department = new Department(req.body);
	department.user = req.user;

	department.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(department);
		}
	});
};

/**
 * Show the current Department
 */
exports.read = function(req, res) {
	res.jsonp(req.department);
};

/**
 * Update a Department
 */
exports.update = function(req, res) {
	var department = req.department ;

	department = _.extend(department , req.body);

	department.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(department);
		}
	});
};

/**
 * Delete an Department
 */
exports.delete = function(req, res) {
	var department = req.department ;

	department.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(department);
		}
	});
};

/**
 * List of Departments
 */
exports.list = function(req, res) { Department.find().sort('-created').populate('user', 'displayName').exec(function(err, departments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(departments);
		}
	});
};

/**
 * Department middleware
 */
exports.departmentByID = function(req, res, next, id) { Department.findById(id).populate('user', 'displayName').exec(function(err, department) {
		if (err) return next(err);
		if (! department) return next(new Error('Failed to load Department ' + id));
		req.department = department ;
		next();
	});
};

/**
 * Department authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.department.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};