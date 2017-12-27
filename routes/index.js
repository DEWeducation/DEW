var cache = require('../util/cache');
var Order = require('../models/order');

module.exports = function (app) {
    /* GET home page. */

    app.get('/', function (req, res, next) {
        cache.get('login_success', function (err, user) {
            if (err) {
                return next(err);
            }
            res.render('index', { user: user });
        });
    });

    app.get('/welcome', function (req, res, next) {
        res.render('welcome');
    });

    app.post('/post_order', function (req, res, next) {
        var bonus              = req.body.bonus
        , t_type               = req.body.t_type
        , e_stage              = req.body.e_stage
        , k_Point              = req.body.k_Point
        , sub_class            = req.body.sub_class
        , require_teacher      = req.body.require_teacher
        , p_detail             = req.body.p_detail
        , require_teacher_else = req.body.require_teacher_else;

        require_teacher = require_teacher instanceof Array ? require_teacher.join(',') : require_teacher;
        cache.get('login_success', function (err, u) {
            if (err) {
                return next(err);
            }
            if (!u) return next('请登录');

            // todo: 数据校验
            var order = new Order({
                bonus: bonus,
                t_type: t_type,
                e_stage: e_stage,
                k_Point: k_Point,
                sub_class: sub_class,
                require_teacher: require_teacher + ',' + require_teacher_else,
                p_detail: p_detail,
                userId: u._id
            });

            order.save(function (err, oder) {
                if (err) return next(err);
                res.redirect('/orderList');
            });
        });
        

        
    });

    app.get('/orderList', function (req, res, next) {
        Order.find({}, function (err, orders) {
            if (err) return next(err);
            orders = orders || [];
            res.render('orderList', { orders: orders });
        });
    })

    app.get('/whiteboard', function (req, res, next) {
        res.render('whiteboard')
    })

    app.get('/whiteboard2', function (req, res, next) {
        res.render('whiteboard-two')
    })
    app.get('/whiteboard3', function (req, res, next) {
        res.render('FUCK')
    })

    app.get('/myvideo', function (req, res, next) {
        res.render('myvideo')
    })

    app.get('/logout', function (req, res, next) {
        cache.del('login_success');
        res.redirect('/'); //跳转到主页
    })
};
