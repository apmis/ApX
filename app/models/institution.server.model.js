'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Institution Schema
 */
var InstitutionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Institution name',
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

mongoose.model('Institution', InstitutionSchema);