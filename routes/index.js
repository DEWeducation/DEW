module.exports = function (app) {
    /* GET home page. */
	
    app.get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    app.get('/welcome', function (req, res, next) {
        res.render('welcome', {title: 'Express'});
    });
    app.get('/orderList', function (req, res, next) {
        res.render('orderList')
    })

    app.get('/whiteboard', function (req, res, next) {
        res.render('whiteboard-two')
    })

};
