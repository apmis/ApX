'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var insttypes = require('../../app/controllers/insttypes');

	// Insttypes Routes
	app.route('/insttypes')
		.get(insttypes.list)
		.post(users.requiresLogin, insttypes.create);

	app.route('/insttypes/:insttypeId')
		.get(insttypes.read)
		.put(users.requiresLogin, insttypes.hasAuthorization, insttypes.update)
		.delete(users.requiresLogin, insttypes.hasAuthorization, insttypes.delete);

	// Finish by binding the Insttype middleware
	app.param('insttypeId', insttypes.insttypeByID);
};