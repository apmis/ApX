'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Instlocation Schema
 */
var InstlocationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Instlocation name',
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

mongoose.model('Instlocation', InstlocationSchema);