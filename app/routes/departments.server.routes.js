'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var departments = require('../../app/controllers/departments');

	// Departments Routes
	app.route('/departments')
		.get(departments.list)
		.post(users.requiresLogin, departments.create);

	app.route('/departments/:departmentId')
		.get(departments.read)
		.put(users.requiresLogin, departments.hasAuthorization, departments.update)
		.delete(users.requiresLogin, departments.hasAuthorization, departments.delete);

	// Finish by binding the Department middleware
	app.param('departmentId', departments.departmentByID);
};