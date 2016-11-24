/**
 * Created by qvjunping on 2016/10/13.
 */
var mongoose = require('mongoose')

var DrawSchema = new mongoose.Schema({
    id: Number, //增加指定增加的id
    downOrUp: String,
    downX: Number,
    downY: Number,
    penX: Number,
    penY: Number,
    penType: String,
    penColor: String,
    penSize: Number,
    mouseTime: Number,
    canvaseMess: String,
    time: {
        type: Date,
        default: Date.now()
    }
})


DrawSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = DrawSchema