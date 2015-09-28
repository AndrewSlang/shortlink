var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');
var User      	 = require('./user');

var LinksSchema = new Schema({
	//_creator			: { type: String, ref: 'User' },
	linkname 			: { type: String, required: true, ref: 'User' },
	shortlinkname		: { type: String, ref: 'User' },
	description     	: { type: String, ref: 'User' },
	hits     			: { type: Number, ref: 'User' },
	tags				: { type: Array, ref: 'User' }
});

module.exports = mongoose.model('Links', LinksSchema);