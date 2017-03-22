var express = require("express");
var path = require("path");
var app = express();
var engine = require('ejs-locals');
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');
var sphp = require('sphp');

mongoose.Promise = global.Promise;
var conn = mongoose.createConnection('mongodb://35.161.80.18:27017/car');
var Car = require('./models/car');
var part_category = require('./models/part_category');
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(sphp.express('public/'));
app.use(express.static('public/')); 
app.get('/', function (req, res) {
    conn.collection('car').insert({name: 2, user_id: "s"});
    res.end();
});
app.post('/insert_part_category', function (req, res) {
    console.log("inserted");
    conn.collection('part_category').insert({part_name:req.body.title})
    res.redirect("/part_category");
})
app.post('/github', function (req, res) {
    res.redirect("/github.php");
})
app.get('/github', function (req, res) {
    res.redirect("/github.php");
})
app.get('/part_category', function (req, res) {
    part_category.find({}).exec(function (err, doc_l) {
        console.log(doc_l);
        res.render('test', {data: doc_l, length: doc_l.length});
        //res.end(JSON.stringify(doc_l));
    })
});
app.get('/kakao_login', function (req, res) {
    res.sendFile(__dirname+"/kakao_login.html");
})

app.listen(app.get('port'));

