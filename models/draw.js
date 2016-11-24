/**
 * Created by qvjunping on 2016/10/13.
 */
var mongoose = require('mongoose')
var DrawSchema = require('../schemas/draw.js')
var Draw = mongoose.model('Draw', DrawSchema)

module.exports = Draw