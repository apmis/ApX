'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Empmodule Schema
 */
var EmpmoduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Empmodule name',
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

mongoose.model('Empmodule', EmpmoduleSchema);