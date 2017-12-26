/**
 * Created by Longway on 2016/7/21.
 */
var canReDraw = false;
var canvas0, canvas1, canvas2, ctx0, ctx1, ctx2;
var num = 0;
var t;
/////////////////////////////////////////////
var canvasWidth = document.getElementById('canvasdiv').clientWidth;
var canvasHeight = document.getElementById('canvasdiv').clientHeight;

var socket = io();
// 回放相关
var uptime = 0;
var starTime = 0;
var lastTime = 0;
var drawHistory = [];
var faster = 1;
var image1 = new Image();
var imageHis = [];
var page = 0;
var maxPage = 0;


var canvas2 = document.createElement("canvas");
canvas2.setAttribute("width", document.getElementById('canvasdiv').clientWidth);
canvas2.setAttribute("height", document.getElementById('canvasdiv').clientHeight);
canvas2.setAttribute("id", "canvas2");
canvasdiv.appendChild(canvas2);

var canvas1 = document.createElement("canvas");
canvas1.setAttribute("width", document.getElementById('canvasdiv').clientWidth);
canvas1.setAttribute("height", document.getElementById('canvasdiv').clientHeight);
canvas1.setAttribute("id", "canvas1");
canvasdiv.appendChild(canvas1);
/////////////////////////////////////////////


ctx1 = canvas1.getContext('2d');

ctx2 = canvas2.getContext('2d');

$('#canvas1').css("z-index", 1);
$('#canvas2').css("z-index", 2);

(function requireHistory() {

    //请求视频列表接收
    socket.on('responseMyVideoList', function (getData) {
        var itemUl = document.getElementById('itemUl');
        var li = document.createElement("li");
        var a = document.createElement("a");
        var t = document.createTextNode("视频1");
        a.appendChild(t);
        li.appendChild(a);
        if(getData=="end"){
            return
        }
        itemUl.appendChild(li);
        a.addEventListener("click", function () {
            requestVideo(getData);
        })
    })

    socket.on('responseVideo', function (data) {
        num++;
        //新操作踢掉两个if部分
        if (data.downOrUp == "down" || data.downOrUp == "up") {
            drawHistory.push({
                downorup: data.downOrUp,
                downx: data.downX,
                downy: data.downY,
                penx: data.penX,
                peny: data.penY,
                pentype: data.penType,
                pencolor: data.penColor,
                pensize: data.penSize,
                time: data.mouseTime,
                mess: data.canvaseMess
            });
        }

        if (data.downOrUp == "free") {
            drawHistory.push({
                downorup: "free",
                downx: data.downX,
                downy: data.downY,
                penx: data.penX,
                peny: data.penY,
                pentype: data.penType,
                pencolor: data.penColor,
                pensize: data.penSize,
                time: data.mouseTime
            })
        }
        if (data == "end") {
            canReDraw = true;
            // alert("接收完毕")
            // console.log(drawHistory);
            console.info(num);
            console.log(data);
            num = 0;
            if (canReDraw) {
                forHistory();
            }
            canReDraw = false;
        }
    });

    socket.on('redraw', function (data) {

    });

})();


function forHistory() {
    cleanCtx(1);
    clearTimeout(t);
    // $("#canvas2").unbind();
    var firstTime = drawHistory[0].time;
    console.log(drawHistory.length);
    for (var i = 0; i < drawHistory.length; i++) {
        var _ = drawHistory[i];
        (function _(_) {
            t = setTimeout(function () {
                drawAgian(_.downorup, _.downx, _.downy, _.penx, _.peny, _.pentype, _.pencolor, _.pensize, _.mess)
            }, (_.time - firstTime) / getFaster())
        })(_);
    }
    drawHistory = [];
}

//请求视频列表
function requestMyVideoList() {
    var sendDate = {
        flag: 'getList',
        userId: 123
    }
    socket.emit('requestMyVideoList', sendDate)//请求视频列表,两个参数，标志、用户号
}

//请求视频
function requestVideo(_courseId) {
    var sendDate = {
        flag: 'getVideo',
        userId: 123,
        courseId: _courseId
    }
    socket.emit('requestVideo', sendDate)
    socket.emit('reAudio',"yes");
}
function reDraw() {
    socket.emit('redraw', 're' + '123' + '333');//三个参数，标志、用户号、课程号
}

function drawAgian(downorup, downx, downy, penx, peny, pentype, pencolor, pensize, mess) {
    downx = downx * canvasWidth;
    downy = downy * canvasHeight;
    penx = penx * canvasWidth;
    peny = peny * canvasHeight;

    //如果line down up 注意

    if (downorup == 'down') {
        ctx2.beginPath();
        ctx2.moveTo(penx, peny);
        downOrUp = 'down';
    }
    if (downorup == 'up') {
        if (mess) {
            ctx1.fillStyle = pencolor;
            ctx1.font = parseInt(pensize) * 10 + "px" + " Georgia";
            ctx1.fillText(mess, parseInt(downx), parseInt(downy));
        }
        ctx2.closePath();
        downOrUp = 'up';
        if (pentype != 'rubber') {
            // alert("2存入1");
            var image = new Image();
            image.src = canvas2.toDataURL();
            image.onload = function () {
                ctx1.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
                cleanCtx();
            }
        } else {
            ctx2.clearRect(penx - pensize * 6, peny - pensize * 6, pensize * 12, pensize * 12);
            // ctx1.clearRect(penx - pensize * 5, peny - pensize * 5, pensize * 10, pensize * 10);
        }
    }
    else {
        ctx2.strokeStyle = pencolor;
        ctx1.strokeStyle = pencolor;
        ctx2.lineWidth = pensize;
        ctx1.lineWidth = pensize;
        if (pentype == 'pencil') {
            // console.log("this is pencil")
            ctx2.lineTo(penx, peny);
            ctx2.stroke();
        } else if (pentype == 'line') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downx, downy);
            ctx2.lineTo(penx, peny);
            ctx2.stroke();
            // ctx2.closePath();
        } else if (pentype == 'sanjian') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(parseInt(downx), parseInt(downy));
            ctx2.lineTo(2 * parseInt(downx) - parseInt(penx), parseInt(peny));
            ctx2.lineTo(parseInt(penx), parseInt(peny));
            ctx2.lineTo(parseInt(downx), parseInt(downy));
            ctx2.stroke();
        } else if (pentype == 'zhijiaosanjiao') {

            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(parseInt(downx), parseInt(downy));
            ctx2.lineTo(parseInt(downx), parseInt(peny));
            ctx2.lineTo(parseInt(penx), parseInt(peny));
            ctx2.lineTo(parseInt(downx), parseInt(downy));
            ctx2.stroke();
        } else if (pentype == 'jvxing') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downx, downy);
            ctx2.lineTo(penx, downy);
            ctx2.lineTo(penx, peny);
            ctx2.lineTo(downx, peny);
            ctx2.lineTo(downx, downy);
            ctx2.stroke();
        } else if (pentype == 'fang') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(parseInt(downx), parseInt(downy));
            ctx2.lineTo(parseInt(penx), parseInt(downy));
            ctx2.lineTo(parseInt(penx), parseInt(downy) + parseInt(penx) - parseInt(downx));
            ctx2.lineTo(parseInt(downx), parseInt(downy) + parseInt(penx) - parseInt(downx));
            ctx2.lineTo(parseInt(downx), parseInt(downy));
            ctx2.stroke();
        } else if (pentype == 'yuan') {
            cleanCtx();
            ctx2.beginPath();
            var radii = Math.sqrt((downx - penx) * (downx - penx) + (downy - peny) * (downy - peny));
            ctx2.arc(downx, downy, radii, 0, Math.PI * 2, false);
            ctx2.stroke();
        } else if (pentype == 'rubber') {
            ctx2.lineWidth = 1;
            cleanCtx();
            ctx2.beginPath();
            ctx2.moveTo(parseInt(penx) - pensize * 5, parseInt(peny) - pensize * 5);
            ctx2.lineTo(parseInt(penx) + pensize * 5, parseInt(peny) - pensize * 5);
            ctx2.lineTo(parseInt(penx) + pensize * 5, parseInt(peny) + pensize * 5);
            ctx2.lineTo(parseInt(penx) - pensize * 5, parseInt(peny) + pensize * 5);
            ctx2.lineTo(parseInt(penx) - pensize * 5, parseInt(peny) - pensize * 5);
            ctx2.stroke();
            if (downOrUp == 'down') {
                ctx1.clearRect(penx - pensize * 5, peny - pensize * 5, pensize * 10, pensize * 10);
            }
        } else if (pentype == 'clearAll') {
            // alert("jfdks")
            cleanCtx(canvas1);
        }
    }
}

$("#recover").mouseover(function () {
    $("#jindutiao").css({
        display: "block"
    })
});

$("#recover").mouseout(function () {
    setTimeout(function () {
        $("#jindutiao").css({
            display: "none"
        })
    }, 10000);
});

function getFaster() {

    faster = $("#jindutiao").val();
    console.log(faster)
    return 1;

}
function cleanCtx(type) {
    if (type) {
        ctx1.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    } else if (!type) {
        ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    }
}
