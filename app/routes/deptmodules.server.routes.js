'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var deptmodules = require('../../app/controllers/deptmodules');

	// Deptmodules Routes
	app.route('/deptmodules')
		.get(deptmodules.list)
		.post(users.requiresLogin, deptmodules.create);

	app.route('/deptmodules/:deptmoduleId')
		.get(deptmodules.read)
		.put(users.requiresLogin, deptmodules.hasAuthorization, deptmodules.update)
		.delete(users.requiresLogin, deptmodules.hasAuthorization, deptmodules.delete);

	// Finish by binding the Deptmodule middleware
	app.param('deptmoduleId', deptmodules.deptmoduleByID);
};