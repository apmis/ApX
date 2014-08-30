'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Deptmodule Schema
 */
var DeptmoduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Deptmodule name',
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

mongoose.model('Deptmodule', DeptmoduleSchema);