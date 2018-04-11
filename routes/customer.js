var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');

router.post('/add', function(req, res) {
	var customer = new Customer(req.body);
	customer.save(function (err) {
        if (err) res.send(JSON.stringify(err.code));
        res.send('Customer registered successfully');
    })
});

router.get('/get', function(req, res) {
	var query = {};
    if (req.param('id')) {
		var id = req.param('id').toString();
		query = { '_id': id }
	}
    Customer.find(query, function (err, customers) {
		if (err) return handleError(err);
		res.send(customers);
	});
});

router.put('/update', function(req, res) {
	var data = new Customer(req.body);
	var customer = {
		firstName: data.firstName,
		lastName: data.lastName,
		phone: data.phone,
		email: data.email,
		password: data.password,
		passwordConf: data.passwordConf
	};
    if (req.param('id')) {
		var id = req.param('id').toString();
		query = { '_id': id }

		Customer.update(query, customer, function (err, response) {
			if (err) return handleError(err);
			res.send('Customer updated successfully');
		});
	}
});

router.delete('/delete', function(req, res) {
    if (req.param('id')) {
		var id = req.param('id').toString();

		Customer.findByIdAndRemove(id, function (err, response) {
			if (err) return handleError(err);
			res.send('Customer deleted successfully');
		});
	}
});

module.exports = router;