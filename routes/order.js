var express = require('express');
var router = express.Router();
var Order = require('../models/Order');

router.post('/add', function(req, res) {
	var order = new Order(req.body);
	order.save(function (err) {
        if (err) res.send(JSON.stringify(err.code));
        res.send('Order placed successfully');
    })
});

router.get('/get', function(req, res) {
	var query = {};
    if (req.param('id')) {
		var id = req.param('id').toString();
		query = { '_id': id }
	}
	if (req.param('customerID')) {
		var customerID = req.param('customerID').toString();
		query = { 'customerID': customerID }
	}
    Order.find(query, function (err, orders) {
		if (err) return handleError(err);
		res.send(orders);
	});
});

router.put('/update', function(req, res) {
	var orderStatus = {
		status: req.body.status
	};
    if (req.param('id')) {
		var id = req.param('id').toString();
		query = { '_id': id }
		Order.update(query, orderStatus, function (err, response) {
			if (err) return handleError(err);
			res.send('Order updated successfully');
		});
	}
});

module.exports = router;