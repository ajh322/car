/**
 * Created by AJH on 2017-04-23.
 */
var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://35.161.80.18:27017/car');
var userSchema = new mongoose.Schema({
    Title: {type: String, required: true},
    Car: {type: String, required: true},
    Region: {type: String, required: true},
    Company: {type: String, required: true},
    Price: {type: String, required: true},
    Time: {type: String, required: true},
    Contents: {type: String, required: true},
    Carimage: {type: String, required: true},
    seq:{type: Number, default: 0 }
});
var car = conn.model('const_case', userSchema, "const_case");
module.exports = car;
