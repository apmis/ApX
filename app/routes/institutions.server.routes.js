'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var institutions = require('../../app/controllers/institutions');

	// Institutions Routes
	app.route('/institutions')
		.get(institutions.list)
		.post(users.requiresLogin, institutions.create);

	app.route('/institutions/:institutionId')
		.get(institutions.read)
		.put(users.requiresLogin, institutions.hasAuthorization, institutions.update)
		.delete(users.requiresLogin, institutions.hasAuthorization, institutions.delete);

	// Finish by binding the Institution middleware
	app.param('institutionId', institutions.institutionByID);
};