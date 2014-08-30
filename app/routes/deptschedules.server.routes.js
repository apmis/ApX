'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var deptschedules = require('../../app/controllers/deptschedules');

	// Deptschedules Routes
	app.route('/deptschedules')
		.get(deptschedules.list)
		.post(users.requiresLogin, deptschedules.create);

	app.route('/deptschedules/:deptscheduleId')
		.get(deptschedules.read)
		.put(users.requiresLogin, deptschedules.hasAuthorization, deptschedules.update)
		.delete(users.requiresLogin, deptschedules.hasAuthorization, deptschedules.delete);

	// Finish by binding the Deptschedule middleware
	app.param('deptscheduleId', deptschedules.deptscheduleByID);
};