'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var instclasses = require('../../app/controllers/instclasses');

	// Instclasses Routes
	app.route('/instclasses')
		.get(instclasses.list)
		.post(users.requiresLogin, instclasses.create);

	app.route('/instclasses/:instclassId')
		.get(instclasses.read)
		.put(users.requiresLogin, instclasses.hasAuthorization, instclasses.update)
		.delete(users.requiresLogin, instclasses.hasAuthorization, instclasses.delete);

	// Finish by binding the Instclass middleware
	app.param('instclassId', instclasses.instclassByID);
};