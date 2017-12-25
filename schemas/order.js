var mongoose = require('mongoose')

var OrderSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId, //下单用户id
    bonus: Number, // 悬赏金额
    t_type: String, // 辅导老师类型
    e_stage: String, // 教育阶段
    k_Point: String, //对应知识点
    sub_class: String, //按科目分类
    require_teacher: String, // 教师要求
    p_detail: String //问题详细描述
})

module.exports = OrderSchema