'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Deptunit Schema
 */
var DeptunitSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Deptunit name',
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

mongoose.model('Deptunit', DeptunitSchema);