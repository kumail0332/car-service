var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	customerID: {
		type: String,
		required: true,
		trim: true
	},
	carYear: {
		type: String,
		required: true,
		trim: true
	},
	carMake: {
		type: String,
		required: true,
		trim: true
	},
	carModel: {
		type: String,
		required: true,
		trim: true
	},
	services: {
		type: Array,
		required: true
	},
	totalCharges: {
		type: Number
	},
	date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: 'pending'
	}
});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;