var express = require("express");
var app = express();

// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res){
    res.send('hello world');
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

