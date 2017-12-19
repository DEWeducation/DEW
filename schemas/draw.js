/**
 * Created by qvjunping on 2016/10/13.
 */
var mongoose = require('mongoose')

var DrawSchema = new mongoose.Schema({
    userId: Number, //用户id
    courseId:Number,//课程id
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