var express = require("express");
var path = require("path");
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection('mongodb://35.161.80.18:27017/car');
var Car = require('./models/car');
// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res){
    console.log(Car.find({}));

    res.sendFile(path.join(__dirname + '/test.ejs'));
});

app.get('/', function (req, res) {
    res.send('Hello World!');
    res.end('Hello World!');
    console.log('Example app listening on port 3000!');
});
// Only works on 3000 regardless of what I set environment port to or how I set
// [value] in app.set('port', [value]).
// app.listen(3000);
app.listen(app.get('port'));

