'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var instlocations = require('../../app/controllers/instlocations');

	// Instlocations Routes
	app.route('/instlocations')
		.get(instlocations.list)
		.post(users.requiresLogin, instlocations.create);

	app.route('/instlocations/:instlocationId')
		.get(instlocations.read)
		.put(users.requiresLogin, instlocations.hasAuthorization, instlocations.update)
		.delete(users.requiresLogin, instlocations.hasAuthorization, instlocations.delete);

	// Finish by binding the Instlocation middleware
	app.param('instlocationId', instlocations.instlocationByID);
};