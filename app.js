var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carService');

app.use(bodyParser.urlencoded({ extended: false }));

// include routes
app.use('/', express.static('views'));
app.use('/api/customers', require('./routes/customer'));
app.use('/api/cars', require('./routes/car'));

// listen on port 3000
app.listen(3000);