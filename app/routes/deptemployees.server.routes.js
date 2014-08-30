'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var deptemployees = require('../../app/controllers/deptemployees');

	// Deptemployees Routes
	app.route('/deptemployees')
		.get(deptemployees.list)
		.post(users.requiresLogin, deptemployees.create);

	app.route('/deptemployees/:deptemployeeId')
		.get(deptemployees.read)
		.put(users.requiresLogin, deptemployees.hasAuthorization, deptemployees.update)
		.delete(users.requiresLogin, deptemployees.hasAuthorization, deptemployees.delete);

	// Finish by binding the Deptemployee middleware
	app.param('deptemployeeId', deptemployees.deptemployeeByID);
};