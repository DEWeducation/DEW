/**
 * Created by qvjunping on 2016/10/13.
 */
/**
 * Created by qvjunping on 2016/10/12.
 */
var mongoose = require('mongoose')

var AudioSchema = new mongoose.Schema({
    data: Buffer,
    id: Number,
    time: {
        type: Date,
        default: Date.now()
    }
})


AudioSchema.statics = {
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

module.exports = AudioSchema