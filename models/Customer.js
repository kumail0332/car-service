var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
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
		type: String,
		required: true
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

var Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;