var express = require('express');
var router = express.Router();
var Service = require('../models/Service');

router.post('/add', function(req, res) {
	var service = new Service(req.body);
	service.save(function (err) {
        if (err) res.send(JSON.stringify(err.code));
        res.send('Service added successfully');
    })
});

router.post('/login', function(req, res) {
	var serviceCreds = req.body;
	Service.findOne(serviceCreds, function (err, service) {
		if (err) return handleError(err);
		if (service) {
			req.session.user = {
				id: service._id,
				name: service.firstName
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
    Service.find(query, function (err, services) {
		if (err) return handleError(err);
		res.send(services);
	});
});

router.put('/update', function(req, res) {
	var data = new Service(req.body);
	var service = {
		serviceName: data.serviceName,
		price: data.price,
		estimateTime: data.estimateTime
	};
    if (req.param('id')) {
		var id = req.param('id').toString();
		query = { '_id': id }
		Service.update(query, service, function (err, response) {
			if (err) return handleError(err);
			res.send('Service updated successfully');
		});
	}
});

router.delete('/delete', function(req, res) {
    if (req.param('id')) {
		var id = req.param('id').toString();

		Service.findByIdAndRemove(id, function (err, response) {
			if (err) return handleError(err);
			res.send('Service deleted successfully');
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