var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
    res.end('Hello World!');
    console.log('Example app listening on port 3000!');
});

app.listen(3000, function () {
    console.log('example app listening on port 3000!');
});
