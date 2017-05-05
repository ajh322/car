/**
 * Created by AJH322 on 2016-11-11.
 */
var mongoose = require('mongoose');
var conn = mongoose.createConnection('localhost:27017/car');
var userSchema = new mongoose.Schema({
    part_category: {type: String, required: true, unique: true}
});
var part_category = conn.model('part_category', userSchema, "part_category");
module.exports = part_category;