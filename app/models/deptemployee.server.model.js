'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Deptemployee Schema
 */
var DeptemployeeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Deptemployee name',
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

mongoose.model('Deptemployee', DeptemployeeSchema);