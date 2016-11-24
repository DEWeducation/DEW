var Audio = require('../models/audio');
var Draw = require('../models/draw');
module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connection');

        //断开连接
        socket.on('disconnect', function () {
            console.log('a user disconnection');
        });

        //鼠标按下或抬起和笔的类型   转发+保存
        socket.on('downorup', function (downorup, downx, downy, penx, peny, pentype, pencolor, pensize, mousetime, CanvasMess) {
            socket.broadcast.emit('downorup', downorup, downx, downy, penx, peny, pentype, pencolor, pensize, mousetime, CanvasMess);

            //将数据写入到数据库中
            var draw = new Draw({
                // id: ++MYID, //增加指定增加的id
                downOrUp: downorup,
                downX: downx,
                downY: downy,
                penX: penx,
                penY: peny,
                penType: pentype,
                penColor: pencolor,
                penSize: pensize,
                mouseTime: mousetime,
                canvaseMess: CanvasMess

            });

            draw.save(function (err, draw) {
                if (err) return console.log(err);
            });
        });

        //坐标，画图，保存   转发+保存
        socket.on('message', function (downx, downy, penx, peny, pentype, pencolor, pensize, lasttime) {
            // console.log(downx,downy,penx,peny,pentype,pencolor,pensize,lasttime);
            socket.broadcast.emit('message', downx, downy, penx, peny, pentype, pencolor, pensize);

            //将数据写入到数据库中
            var draw = new Draw({
                // id: ++MYID, //增加指定增加的id
                downOrUp: "free",
                downX: downx,
                downY: downy,
                penX: penx,
                penY: peny,
                penType: pentype,
                penColor: pencolor,
                penSize: pensize,
                mouseTime: lasttime
            });

            draw.save(function (err, draw) {
                if (err) return console.log(err);
                // console.dir(draw);
            });

        });

        //画板翻页
        socket.on('fanYe', function (data) {
            console.log(data)
            socket.broadcast.emit('fanYe', data);
        });
        //聊天消息文字  转发
        socket.on('chat message', function (mess) {
            socket.broadcast.emit('chat message', mess);
            // console.log(mess);
        });

        //聊天声音数据长连  转发  保存
        socket.on('audiomore', function (data) {
            socket.broadcast.emit('audiomore', data);
            var audio = new Audio({
                data: data,
                // id: ++MYID
            });
            audio.save(function (err) {
                if (err) {
                    console.error('audio save error:', err);
                }
                console.info("audio save success");
                console.info(audio.data);
            });
        });

        //聊天声音数据短连接 转发无需保存
        socket.on('shortAudio', function (data) {
            socket.broadcast.emit('shortAudio', data);
        });

        //重新绘制
        socket.on('redraw', function (re) {
            console.log("someone ask history");

            Draw.find({}, function (err, chunk) {
                if (err) {
                    console.error(err);
                    return
                }
                console.log("123");
                // chunk.sort({"mousetime": 1});
                //console.log(chunk.toString());
                var data;
                console.log("开始都数据库");
                for (var i = 0; i < chunk.length; i++) {
                    //console.dir(dat);
                    data = chunk[i];
                    // console.log(data.canvaseMess);
                    socket.emit('redraw', data);
                }
                socket.emit('redraw', "end");
                console.log("数据库读取完毕");
            });

        });

        //重新播放
        socket.on('reAudio', function (yes) {
            console.log(yes);

            Audio.find({}, function (err, audios) {
                if (err) {
                    console.erro("audio find erro");
                }
                // audios.sort({"id": 1});
                for (var i = 0; i < audios.length; i++) {
                    var data = audios[i].data;
                    console.log(i);
                    socket.emit('reAudio', data);

                }
                socket.emit('reAudio', 'end');
                console.log("结束了")
            });
        });
    });

}