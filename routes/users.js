module.exports = function (app) {

    //登陆页面
    app.get('/getLoginIn', function (req, res, next) {
        res.render('loginIn')
    });


    //注册页面
    app.get('/getLoginUp', function (req, res) {
        res.render('loginUp')
    });

    app.get('/profile', function (req, res) {
    	res.render('profile')
    })
}

