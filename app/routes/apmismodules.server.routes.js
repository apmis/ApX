'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var apmismodules = require('../../app/controllers/apmismodules');
   var jwtauth = require('../../config/jwtauth');

	// Apmismodules Routes
	app.route('/api/apmismodules')
		.get(jwtauth,apmismodules.list)
		.post(jwtauth, apmismodules.create);

	app.route('/api/apmismodules/:apmismoduleId')
		.get(users.requiresLogin,apmismodules.read)
		.put(users.requiresLogin, apmismodules.hasAuthorization, apmismodules.update)
		.delete(users.requiresLogin, apmismodules.hasAuthorization, apmismodules.delete);

	// Finish by binding the Apmismodule middleware
	app.param('apmismoduleId', apmismodules.apmismoduleByID);
};
