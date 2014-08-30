'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var retcompanies = require('../../app/controllers/retcompanies');

	// Retcompanies Routes
	app.route('/retcompanies')
		.get(retcompanies.list)
		.post(users.requiresLogin, retcompanies.create);

	app.route('/retcompanies/:retcompanyId')
		.get(retcompanies.read)
		.put(users.requiresLogin, retcompanies.hasAuthorization, retcompanies.update)
		.delete(users.requiresLogin, retcompanies.hasAuthorization, retcompanies.delete);

	// Finish by binding the Retcompany middleware
	app.param('retcompanyId', retcompanies.retcompanyByID);
};