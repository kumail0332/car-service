const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const opn = require('opn');

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carService');

app.use(cookieParser());
app.use(session({
	secret: 'paf-kiet-2018',
	resave: true,
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: false }));

// include routes
app.use('/', express.static('views'));
app.use('/assets', express.static('assets'));
app.use('/api/validate-session', require('./routes/validate-session'));
app.use('/api/users', require('./routes/user'));
app.use('/api/customers', require('./routes/customer'));
app.use('/api/cars', require('./routes/car'));
app.use('/api/services', require('./routes/service'));

// listen on port 3000
app.listen(3000, function() {
	console.log('Running app http://localhost:3000');
	// opn('http://localhost:3000');
});