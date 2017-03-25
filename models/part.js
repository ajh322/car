/**
 * Created by AJH on 2017-03-25.
 */
module.exports = function (parm) {
    var mongoose = require('mongoose');
    var conn = mongoose.createConnection('mongodb://35.161.80.18:27017/car');
    var userSchema = new mongoose.Schema({
        part_category: {type: String},
        part_name: {type: String, required: true, index: true, sparse: true, unique: true},
    });
    return part = conn.model(parm, userSchema, parm);
}