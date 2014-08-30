'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Instclass Schema
 */
var InstclassSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Instclass name',
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

mongoose.model('Instclass', InstclassSchema);