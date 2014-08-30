'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var deptunits = require('../../app/controllers/deptunits');

	// Deptunits Routes
	app.route('/deptunits')
		.get(deptunits.list)
		.post(users.requiresLogin, deptunits.create);

	app.route('/deptunits/:deptunitId')
		.get(deptunits.read)
		.put(users.requiresLogin, deptunits.hasAuthorization, deptunits.update)
		.delete(users.requiresLogin, deptunits.hasAuthorization, deptunits.delete);

	// Finish by binding the Deptunit middleware
	app.param('deptunitId', deptunits.deptunitByID);
};