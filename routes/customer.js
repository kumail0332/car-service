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

router.post('/login', function(req, res) {
	var customerCreds = req.body;
	Customer.findOne(customerCreds, function (err, customer) {
		if (err) return handleError(err);
		if (customer) {
			req.session.user = {
				id: customer._id,
				name: customer.firstName
			};
		    return res.send({result: 'redirect', url:'/'})
		} else {
		    return res.send({error: 'Invalid email or password.'})
		}
	});
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

router.get('/logout', function (req, res) {
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) return handleError(err);
	    	else
	    	return res.send({result: 'redirect', url:'/login.html'})
		})
	}
});

module.exports = router;