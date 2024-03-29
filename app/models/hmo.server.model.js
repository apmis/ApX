'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Hmo Schema
 */
var HmoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Hmo name',
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

mongoose.model('Hmo', HmoSchema);