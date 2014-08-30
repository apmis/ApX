'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var useremployees = require('../../app/controllers/useremployees');

	// Useremployees Routes
	app.route('/useremployees')
		.get(useremployees.list)
		.post(users.requiresLogin, useremployees.create);

	app.route('/useremployees/:useremployeeId')
		.get(useremployees.read)
		.put(users.requiresLogin, useremployees.hasAuthorization, useremployees.update)
		.delete(users.requiresLogin, useremployees.hasAuthorization, useremployees.delete);

	// Finish by binding the Useremployee middleware
	app.param('useremployeeId', useremployees.useremployeeByID);
};