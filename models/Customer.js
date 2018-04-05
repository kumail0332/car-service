var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
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
	},
	passwordConf: {
		type: String,
		required: true,
	}
});

var Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;