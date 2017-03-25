var express = require("express");
var path = require("path");
var app = express();
var engine = require('ejs-locals');
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');
var htmlBuilder = require('./modules/html-builder');
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
//자동 업데이트 기능
app.post('/deploy/', function (req, res) {
    var spawn = require('child_process').spawn,
        deploy = spawn('sh', ['./deploy.sh']);

    deploy.stdout.on('data', function (data) {
        console.log('' + data);
    });

    deploy.on('close', function (code) {
        console.log('Child process exited with code ' + code);
    });
    res.json(200, {message: 'Github Hook received!'})
});

//테스트용
app.get('/', function (req, res) {
    conn.collection('car').insert({name: 2, user_id: "s"});
    res.end();
});
//파트 카테고리 추가
app.post('/insert_part_category', function (req, res) {
    console.log("inserted");
    if (req.body.part_category != "") {
        conn.collection('part_category').insert({part_category: req.body.part_category})
        fs.writeFile(__dirname + "/views/" + req.body.part_category + ".ejs", htmlBuilder.buildHtml("ejs_for_add_part_category"), function (err) {
            if (err) {
                return console.log(err);
            }
            var Schema = new mongoose.Schema({
                part_category: {type: String},
                part_name: {type: String, required: true, index: true, sparse: true, unique: true},
            });
            var part = conn.model(req.body.part_category, Schema, req.body.part_category);
            part.part_category = req.body.part_category;
            part.part_name = "asd";
            part.save(function (err) {
                if (err) console.log("Something went wrong while saving the thing");
                else console.log("Thing was successfully saved");
            });
            console.log("The file was saved!");
        });
        res.redirect("/part_category");
    }
    else {
        res.end("잘못된 입력");
    }
})
app.get('/add_part_category', function (req, res) {
    part_category.find({}).exec(function (err, doc) {
        console.log(doc)
        res.render('add_part_category', {data: doc, length: doc.length});
    });
});
app.get('/get_part_category', function (req, res) {
    part_category.find({}).exec(function (err, doc) {
        res.end(JSON.stringify(doc));
    })
});
app.get('/select_part_category', function (req, res) {
    part_category.find({}).exec(function (err, doc) {
        res.render('select_part_category', {data: doc, length: doc.length});
    })
});
app.get('/add_part', function (req, res) {
    part_category.find({}).exec(function (err, doc) {
        res.render('select_part_category', {data: doc, length: doc.length});
    })
});

app.get('/kakao_login', function (req, res) {
    res.sendFile(__dirname + "/kakao_login.html");
})

app.listen(app.get('port'));

function get_part_category() {
    part_category.find({}).exec(function (err, doc_l) {
        return doc_l;
    });
};

