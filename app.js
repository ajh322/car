var express = require("express");
var path = require("path");
var app = express();
var engine = require('ejs-locals');
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
var conn = mongoose.createConnection('mongodb://35.161.80.18:27017/car');
var Car = require('./models/car');
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    conn.collection('car').insert({name: 2, user_id: "s"});
    res.end();
});
app.get('/test', function (req, res) {
    var data=Car.find({});
    res.render('test', {data:data,length:data.length});
});
app.listen(app.get('port'));

