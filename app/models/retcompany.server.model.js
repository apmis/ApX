'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Retcompany Schema
 */
var RetcompanySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Retcompany name',
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

mongoose.model('Retcompany', RetcompanySchema);