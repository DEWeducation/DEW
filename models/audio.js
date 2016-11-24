/**
 * Created by qvjunping on 2016/10/13.
 */
var mongoose = require('mongoose')
var AudioSchema = require('../schemas/audio.js')
var Audio = mongoose.model('Audio', AudioSchema)

module.exports = Audio