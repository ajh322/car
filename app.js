var express = require("express");
var path = require("path");
var app = express();
var engine = require('ejs-locals');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var bodyParser = require('body-parser');
var htmlBuilder = require('./modules/html-builder');
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection('mongodb://35.161.80.18:27017/car');
var Car = require('./models/car');
var part_category = require('./models/part_category');
var part = require('./models/part');
var multer = require('multer')
var mkdirp = require('mkdirp');
app.use(express.static(__dirname + '/public'));
var storage_main = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("바디:");
        console.log(req.body);
        mkdirp('./public/' + req.body.part_category, function(err) {
            console.log(err);
            // path exists unless there was an error
        });
        cb(null, './public/' + req.body.part_category)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
var upload_main = multer({storage: storage_main});
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
        conn.collection('part_category').insert({part_category: req.body.part_category});
        conn.collection('part').insert({part_category: req.body.part_category, part_name: "test"})
        fs.writeFile(__dirname + "/views/" + req.body.part_category + ".ejs", htmlBuilder.buildHtml("ejs_for_add_part_category"), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        res.redirect("/select_part_category");
    }
    else {
        res.end("잘못된 입력");
    }
})

//파트 카테고리 추가
app.get('/add_part_category', function (req, res) {
    part_category.find({}).exec(function (err, doc) {
        console.log(doc)
        res.render('add_part_category', {data: doc, length: doc.length});
    });
});

//파트 카테고리 json으로 받기
app.get('/get_part_category', function (req, res) {
    part_category.find({}).exec(function (err, doc) {
        res.end(JSON.stringify(doc));
    })
});

//파트 카테고리 페이지 선택하는곳
app.get('/select_part_category', function (req, res) {
    part_category.find({}).exec(function (err, doc) {
        res.render('select_part_category', {data: doc, length: doc.length});
    })
});

//파트 카테고리 선택하고나서 보내주기
app.get('/go_part_category', function (req, res) {
    part.find({part_category: req.query.part_category}).exec(function (err, doc) {
        console.log("파트 카테고리" + req.query.part_category);
        res.render(req.query.part_category, {data: doc, length: doc.length, part_category: req.query.part_category});
    })
});
//파트 추가하기
var add_part_upload = upload_main.fields([{name: 'img', maxCount: 1}, {name: 'file', maxCount: 1}]);
app.post('/add_part', add_part_upload, function (req, res, next) {
    conn.collection('part').insert({part_category: req.body.part_category, part_name: req.body.part_name});
    part.find({part_category: req.body.part_category}).exec(function (err, doc) {
        console.log("파트 카테고리" + req.body.part_category);
        console.log("결과" + doc);
        res.render(req.body.part_category, {data: doc, length: doc.length, part_category: req.body.part_category});
    })
});
app.listen(app.get('port'));

function get_part_category() {
    part_category.find({}).exec(function (err, doc_l) {
        return doc_l;
    });
};

