'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Instmodule Schema
 */
var InstmoduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Instmodule name',
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

mongoose.model('Instmodule', InstmoduleSchema);