var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	phone: {
		type: Number,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	}
});

var User = mongoose.model('User', userSchema);
module.exports = User;