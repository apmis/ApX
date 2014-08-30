'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var empmodules = require('../../app/controllers/empmodules');

	// Empmodules Routes
	app.route('/empmodules')
		.get(empmodules.list)
		.post(users.requiresLogin, empmodules.create);

	app.route('/empmodules/:empmoduleId')
		.get(empmodules.read)
		.put(users.requiresLogin, empmodules.hasAuthorization, empmodules.update)
		.delete(users.requiresLogin, empmodules.hasAuthorization, empmodules.delete);

	// Finish by binding the Empmodule middleware
	app.param('empmoduleId', empmodules.empmoduleByID);
};