'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Apmismodule Schema
 */
var ApmismoduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Apmismodule name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Apmismodule', ApmismoduleSchema);