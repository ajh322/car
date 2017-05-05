/**
 * Created by AJH322 on 2016-11-11.
 */
var mongoose = require('mongoose');
var conn = mongoose.createConnection('localhost:27017/car');
var userSchema = new mongoose.Schema({
    strTitle: {type: String, default: ""},
    strCar: {type: String, default: ""},
    strCompany: {type: String, default: ""},
    strPrice: {type: String, default: ""}

});
var car = conn.model('car', userSchema, "car");
module.exports = car;