var express = require("express");
var path = require("path");
var app = express();
var engine = require('ejs-locals');
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection('mongodb://35.161.80.18:27017/car');
var Car = require('./models/car');
app.set('port', process.env.PORT || 8080);
app.get('/', function (req, res) {
    conn.collection('car').insert({name: 2, user_id: "s"});
});
app.listen(app.get('port'));

