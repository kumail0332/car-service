var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/add', function(req, res) {
	var user = new User(req.body);
	user.save(function (err) {
        if (err) res.send(JSON.stringify(err.code));
        res.send('User registered successfully');
    })
});

router.post('/login', function(req, res) {
	var userCreds = req.body;
	User.findOne(userCreds, function (err, user) {
		if (err) return handleError(err);
		if (user) {
			req.session.user = {
				id: user._id,
				name: user.firstName,
				isAdmin: true
			};
		    return res.send({result: 'redirect', url:'/'})
		} else {
		    return res.send({error: 'Invalid email or password.'})
		}
	});
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