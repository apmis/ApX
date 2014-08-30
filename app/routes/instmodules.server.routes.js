'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var instmodules = require('../../app/controllers/instmodules');

	// Instmodules Routes
	app.route('/instmodules')
		.get(instmodules.list)
		.post(users.requiresLogin, instmodules.create);

	app.route('/instmodules/:instmoduleId')
		.get(instmodules.read)
		.put(users.requiresLogin, instmodules.hasAuthorization, instmodules.update)
		.delete(users.requiresLogin, instmodules.hasAuthorization, instmodules.delete);

	// Finish by binding the Instmodule middleware
	app.param('instmoduleId', instmodules.instmoduleByID);
};