'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Deptschedule Schema
 */
var DeptscheduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Deptschedule name',
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

mongoose.model('Deptschedule', DeptscheduleSchema);