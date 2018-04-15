var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
	serviceName: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true,
		trim: true
	},
	estimateTime: {
		type: String,
		required: true,
		trim: true
	}
});

var Service = mongoose.model('Service', serviceSchema);
module.exports = Service;