'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var hmos = require('../../app/controllers/hmos');

	// Hmos Routes
	app.route('/hmos')
		.get(hmos.list)
		.post(users.requiresLogin, hmos.create);

	app.route('/hmos/:hmoId')
		.get(hmos.read)
		.put(users.requiresLogin, hmos.hasAuthorization, hmos.update)
		.delete(users.requiresLogin, hmos.hasAuthorization, hmos.delete);

	// Finish by binding the Hmo middleware
	app.param('hmoId', hmos.hmoByID);
};