'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Insttype Schema
 */
var InsttypeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Insttype name',
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

mongoose.model('Insttype', InsttypeSchema);