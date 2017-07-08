/**
 * Created by Qvjunping on 2016-07-11.
 */
var canvas0, canvas1, canvas2, ctx0, ctx1, ctx2;
//画在2上、画完印在1上、0用作翻页

var penType = "pencil", penColer = "#000000", penSize = "2";
canvasWidth = document.getElementById('canvasdiv').clientWidth;
canvasHeight = document.getElementById('canvasdiv').clientHeight;

var canvasOffsetTop = $("#canvasdiv").offset().top //canvas相对浏览器窗口的偏移量
var canvasOffsetLeft = $("#canvasdiv").offset().left //canvas相对浏览器窗口的偏移量

// $("#elem").position().top        //相对父元素的位置坐标：
// $("#elem").position().left

var downX, downY;//每次按下时的坐标
var canDraw = false;
var downOrUp = 'up';
var CanvasMess = '';
var socket = io();
canvas0 = document.getElementById("canvas0");
ctx0 = canvas0.getContext('2d');
canvas1 = document.getElementById("canvas1");
ctx1 = canvas1.getContext('2d');
canvas2 = document.getElementById("canvas2");
ctx2 = canvas2.getContext('2d');

$('#canvas1').css("z-index", 1);
$('#canvas2').css("z-index", 2);

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

//网格


function chooseColLine(c) {
    ctx0.beginPath();
    ctx0.strokeStyle = '#DCDCDC';
    switch (c) {
        case 'colLine':
            ctx0.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx0.beginPath();

            for (var line = 0; line < canvasWidth; line += 32.9) {
                ctx0.moveTo(line, 0);
                ctx0.lineTo(line, canvasHeight);
                ctx0.stroke();
            }
            for (var cow = 0; cow < canvasHeight; cow += 33.3) {
                ctx0.moveTo(0, cow);
                ctx0.lineTo(canvasWidth, cow);
                ctx0.stroke();
            }
            ctx0.closePath();
            break;
        case 'col':
            ctx0.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx0.beginPath();
            for (var cow = 0; cow < canvasHeight; cow += 33.3) {
                ctx0.moveTo(0, cow);
                ctx0.lineTo(canvasWidth, cow);
                ctx0.stroke();
            }
            ctx0.closePath();
            break;
        case 'none':
            ctx0.clearRect(0, 0, canvasWidth, canvasHeight);
            break;
    }
}

function chooseColor(c) {
    switch (c) {
        case 'R':
            penColer = '#B22222';
            break;
        case 'B':
            penColer = '#000000';
            break;
        case 'Y':
            penColer = '#ffcc00';
            break;
        default:
            break;
    }
    return false;
}

function chooseSize(s) {
    penSize = s;
    return false;
}

function mouseDown(e) {

    canDraw = true;

    downX = e.clientX - canvasOffsetLeft
    downY = e.clientY - canvasOffsetTop

    ctx2.strokeStyle = penColer;
    ctx1.strokeStyle = penColer;
    ctx2.lineWidth = penSize;
    ctx1.lineWidth = penSize;
    if (downOrUp == 'up') {
        ctx2.beginPath();
    }
    e = e || window.event;
    starTime = new Date().getTime();
    // socket.emit('downorup', 'down', downX, downY, e.clientX - canvasOffsetLeft, e.clientY -canvasOffsetTop, penType, penColer, penSize, starTime);
    socket.emit('downorup', 'down', downX / canvasWidth, downY / canvasHeight, (e.clientX - canvasOffsetLeft) / canvasWidth, (e.clientY - canvasOffsetTop) / canvasHeight, penType, penColer, penSize, starTime);
    // alert(canvasWidth)
    if (penType == 'text') {
        ctx2.fillStyle = penColer;
        ctx2.font = parseInt(penSize) * 10 + "px" + " Georgia";
        ctx2.fillText($("#canvasInput").val(), parseInt(downX), parseInt(downY));
        CanvasMess = $("#canvasInput").val();
        $("#canvasInput").val("");
        // alert(CanvasMess)
    } else {
        CanvasMess = "";
        // ctx2.moveTo(e.clientX - canvasOffsetLeft, e.clientY -canvasOffsetTop);
        ctx2.moveTo(downX, downY);
    }
}

function mouseMove(e) {
    if (canDraw && downOrUp == 'up') {
        e = e || window.event;
        lastTime = new Date().getTime();

        if (penType == "pencil") {
            // ctx2.lineTo(e.clientX - canvasOffsetLeft, e.clientY -canvasOffsetTop);
            ctx2.lineTo(e.clientX - canvasOffsetLeft, e.clientY - canvasOffsetTop);
            ctx2.stroke();
        }
        else if (penType == 'line') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, downY);
            ctx2.lineTo(e.clientX - canvasOffsetLeft, e.clientY - canvasOffsetTop);
            ctx2.stroke();
            ctx2.closePath();
        }
        else if (penType == 'sanjian') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, downY);
            ctx2.lineTo(downX * 2 - (e.clientX - canvasOffsetLeft), e.clientY -canvasOffsetTop);
            ctx2.lineTo(e.clientX - canvasOffsetLeft, e.clientY -canvasOffsetTop);
            ctx2.lineTo(downX, downY);
            ctx2.stroke();
        } else if (penType == 'zhijiaosanjiao') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, downY);
            ctx2.lineTo(downX, e.clientY -canvasOffsetTop);
            ctx2.lineTo(e.clientX - canvasOffsetLeft, e.clientY -canvasOffsetTop);
            ctx2.lineTo(downX, downY);
            ctx2.stroke();
        } else if (penType == 'jvxing') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, downY);
            ctx2.lineTo(e.clientX - canvasOffsetLeft, downY);
            ctx2.lineTo(e.clientX - canvasOffsetLeft, e.clientY -canvasOffsetTop);
            ctx2.lineTo(downX, e.clientY -canvasOffsetTop);
            ctx2.lineTo(downX, downY);
            ctx2.stroke();
        } else if (penType == 'fang') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, downY);
            ctx2.lineTo(e.clientX - canvasOffsetLeft, downY);
            ctx2.lineTo(e.clientX - canvasOffsetLeft, downY + e.clientX - canvasOffsetLeft - downX);
            ctx2.lineTo(downX, downY + e.clientX - canvasOffsetLeft - downX);
            ctx2.lineTo(downX, downY);
            ctx2.stroke();
        } else if (penType == 'yuan') {
            cleanCtx();
            ctx2.beginPath();
            var radii = Math.sqrt((downX - e.clientX + canvasOffsetLeft) * (downX - e.clientX +canvasOffsetTop) + (downY - e.clientY + canvasOffsetTop) * (downY - e.clientY +canvasOffsetTop));
            ctx2.arc(downX, downY, radii, 0, Math.PI * 2, false);
            ctx2.stroke();
        } else if (penType == 'rubber') {
            ctx2.lineWidth = 1;
            cleanCtx();
            ctx2.beginPath();
            ctx2.moveTo(e.clientX - canvasOffsetLeft - penSize * 6, e.clientY - canvasOffsetTop - penSize * 7);
            ctx2.lineTo(e.clientX - canvasOffsetLeft + penSize * 5, e.clientY - canvasOffsetTop - penSize * 7);
            ctx2.lineTo(e.clientX - canvasOffsetLeft + penSize * 5, e.clientY - canvasOffsetTop + penSize * 5);
            ctx2.lineTo(e.clientX - canvasOffsetLeft - penSize * 6, e.clientY - canvasOffsetTop + penSize * 5);
            ctx2.lineTo(e.clientX - canvasOffsetLeft - penSize * 6, e.clientY - canvasOffsetTop - penSize * 7);
            ctx2.stroke();
            // ctx2.clearRect(e.clientX-98 - canvasLeft - penSize * 6, e.clientY-60 - canvasTop - penSize * 6, penSize * 12, penSize * 12);
            ctx1.clearRect(e.clientX - canvasOffsetLeft - penSize * 5, e.clientY - canvasOffsetTop - penSize * 5, penSize * 10, penSize * 10);
        }

        socket.emit('message', downX / canvasWidth, downY / canvasHeight, (e.clientX - canvasOffsetLeft) / canvasWidth, (e.clientY - canvasOffsetTop) / canvasHeight, penType, penColer, penSize, lastTime);
        // socket.emit('message', downX, downY, e.clientX - canvasOffsetLeft, e.clientY -canvasOffsetTop, penType, penColer, penSize, lastTime);
        // console.log('发送：', downX, downY, e.clientX-canvasOffsetLeft, e.clientY-60 - document.getElementById('whiteboard').offsetTop, penType, penColer, penSize,lastTime);

    } else if ((!canDraw) && downOrUp == 'up') {
        if (penType == 'yuan') {
            cleanCtx();
            ctx2.beginPath();
            ctx2.arc(e.clientX - canvasOffsetLeft, e.clientY - canvasOffsetTop, 10, 0, Math.PI * 2, false);
            ctx2.stroke();
        } else if (penType == 'rubber') {
            // alert("jfk");
            ctx2.lineWidth = 1;
            cleanCtx();
            ctx2.beginPath();
            ctx2.moveTo(e.clientX - canvasOffsetLeft - penSize * 6, e.clientY - canvasOffsetTop - penSize * 7);
            ctx2.lineTo(e.clientX - canvasOffsetLeft + penSize * 5, e.clientY - canvasOffsetTop - penSize * 7);
            ctx2.lineTo(e.clientX - canvasOffsetLeft + penSize * 5, e.clientY - canvasOffsetTop + penSize * 5);
            ctx2.lineTo(e.clientX - canvasOffsetLeft - penSize * 6, e.clientY - canvasOffsetTop + penSize * 5);
            ctx2.lineTo(e.clientX - canvasOffsetLeft - penSize * 6, e.clientY - canvasOffsetTop - penSize * 7);
            ctx2.stroke();
        }
    }
}

function mouseUp(e) {
    canDraw = false;
    e = e || window.event;
    uptime = new Date().getTime();

    socket.emit('downorup', 'up', downX / canvasWidth, downY / canvasHeight, (e.clientX - canvasOffsetLeft) / canvasWidth, (e.clientY - canvasOffsetTop) / canvasHeight, penType, penColer, penSize, uptime, CanvasMess);

    // socket.emit('downorup', 'up', downX, downY, e.clientX - canvasOffsetLeft, e.clientY -canvasOffsetTop, penType, penColer, penSize, uptime, CanvasMess);
    if (penType != 'rubber') {
        var image = new Image();
        image.src = canvas2.toDataURL();
        image.onload = function () {
            ctx1.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
            cleanCtx();
        }
    }
}

function mouseOut(e) {
    if (penType != 'pencil') {
        cleanCtx();
    }
}

(function receive() {
    socket.on('message', function (downx, downy, penx, peny, pentype, pencolor, pensize) {
        console.log(downx, downy, penx, peny, pentype, pencolor, pensize)
        downx = downx * canvasWidth;
        downy = downy * canvasHeight;
        penx = penx * canvasWidth;
        peny = peny * canvasHeight;
        console.info(downx, downy, penx, peny, pentype, pencolor, pensize)

        // console.log("收到：", pentype, penx, peny, pencolor, pensize);
        ctx2.strokeStyle = pencolor;
        ctx1.strokeStyle = pencolor;
        ctx2.lineWidth = pensize;
        ctx1.lineWidth = pensize;
        if (pentype == 'pencil') {
            ctx2.lineTo(penx, peny);
            ctx2.stroke();
        } else if (pentype == 'line') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downx, downy);
            ctx2.lineTo(penx, peny);
            ctx2.stroke();
            ctx2.closePath();
        } else if (pentype == 'sanjian') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downx, downy);
            ctx2.lineTo(downx * 2 - penx, peny);
            ctx2.lineTo(penx, peny);
            ctx2.lineTo(downx, downy);
            ctx2.stroke();
        } else if (pentype == 'zhijiaosanjiao') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downx, downy);
            ctx2.lineTo(downx, peny);
            ctx2.lineTo(penx, peny);
            ctx2.lineTo(downx, downy);
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
            ctx2.moveTo(downx, downy);
            ctx2.lineTo(penx, downy);
            ctx2.lineTo(penx, downy + penx - downx);
            ctx2.lineTo(downx, downy + penx - downx);
            ctx2.lineTo(downx, downy);
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
            ctx2.moveTo(penx - pensize * 5, peny - pensize * 5);
            ctx2.lineTo(penx + pensize * 5, peny - pensize * 5);
            ctx2.lineTo(penx + pensize * 5, peny + pensize * 5);
            ctx2.lineTo(penx - pensize * 5, peny + pensize * 5);
            ctx2.lineTo(penx - pensize * 5, peny - pensize * 5);
            ctx2.stroke();
            if (downOrUp == 'down') {
                ctx1.clearRect(penx - pensize * 5, peny - pensize * 5, pensize * 10, pensize * 10);
            }
        } else if (pentype == 'clearAll') {
            cleanCtx(canvas1);
        }
    });

    socket.on('downorup', function (downorup, downx, downy, penx, peny, pentype, pencolor, pensize, mousetime, canvasmess) {
        downx = downx * canvasWidth;
        downy = downy * canvasHeight;
        penx = penx * canvasWidth;
        peny = peny * canvasHeight;
        if (downorup == 'down') {
            ctx2.beginPath();
            downOrUp = 'down';
        }
        else if (downorup == 'up') {
            if (canvasmess) {
                // alert(canvasmess)
                ctx2.fillStyle = pencolor;
                ctx2.font = parseInt(pensize) * 10 + "px" + " Georgia";
                ctx2.fillText(canvasmess, parseInt(downx), parseInt(downy));
            }
            ctx2.closePath();
            downOrUp = 'up';
            if (pentype != 'rubber') {
                var image = new Image();
                image.src = canvas2.toDataURL();
                image.onload = function () {
                    ctx1.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
                    cleanCtx();
                }
            }
            cleanCtx();
        }
        // console.log(downorup,downx, downy, penx, peny, pentype, pencolor, pensize,mousetime)
    });
})();

function cleanCtx(type) {
    if (type) {
        ctx1.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    } else if (!type) {
        ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    }
}

function textBoxShow() {
    $("#canvasInput").show();
}

function handleStart(e) {
    console.log("Start");
    e = e || window.event;
    // e.stopPropagation();
    e.preventDefault();
    var touches = e.changedTouches;

    console.log(touches[0].pageX);
    // ctx2.fillRect(touches[0].pageX,touches[0].pageY,5,5);

    canDraw = true;
    downX = touches[0].clientX - canvasOffsetLeft;
    downY = touches[0].clientY -canvasOffsetTop;
    ctx2.strokeStyle = penColer;
    ctx1.strokeStyle = penColer;
    ctx2.lineWidth = penSize;
    ctx1.lineWidth = penSize;
    if (downOrUp == 'up') {
        ctx2.beginPath();
    }

    starTime = new Date().getTime();
    socket.emit('downorup', 'down', downX, downY, touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop, penType, penColer, penSize, starTime);
    console.log("star:", 'down', downX, downY, touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop, penType, penColer, penSize, starTime);
    if (penType == 'text') {
        ctx2.fillStyle = penColer;
        ctx2.font = parseInt(penSize) * 10 + "px" + " Georgia";
        ctx2.fillText($("#canvasInput").val(), parseInt(downX), parseInt(downY));
        CanvasMess = $("#canvasInput").val();
        $("#canvasInput").val("");
        // alert(CanvasMess)
    } else {
        CanvasMess = "";
        ctx2.moveTo(touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop);
    }

}

function handleEnd(e) {
    console.log("End");
    e = e || window.event;
    var touches = e.changedTouches;
    canDraw = false;
    uptime = new Date().getTime();
    socket.emit('downorup', 'up', downX, downY, touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop, penType, penColer, penSize, uptime, CanvasMess);
    console.log("End:", 'up', downX, downY, touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop, penType, penColer, penSize, uptime, CanvasMess);
    if (penType != 'rubber') {
        var image = new Image();
        image.src = canvas2.toDataURL();
        image.onload = function () {
            ctx1.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
            cleanCtx();
        }
    }
}

function handleCancel(e) {
    console.log("Cancle");
    if (penType != 'pencil') {
        cleanCtx();
    }
}

function handleLeave(e) {
    console.log("Leave");
    if (penType != 'pencil') {
        cleanCtx();
    }
}

function handleMove(e) {
    console.log("Move");
    e = e || window.event;
    // e.stopPropagation();
    e.preventDefault();
    var touches = e.changedTouches;
    //  ctx2.lineTo(touches[0].pageX,touches[0].pageY);
    // ctx2.lineTo(touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop);
    // ctx2.stroke();


    if (canDraw && downOrUp == 'up') {

        lastTime = new Date().getTime();

        if (penType == "pencil") {
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop);
            ctx2.stroke();
        }
        else if (penType == 'line') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, downY);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop);
            ctx2.stroke();
            ctx2.closePath();
        }
        else if (penType == 'sanjian') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, touches[0].clientY -canvasOffsetTop);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop);
            ctx2.lineTo((downX + touches[0].clientX - canvasOffsetLeft) / 2, downY);
            ctx2.lineTo(downX, touches[0].clientY -canvasOffsetTop);
            ctx2.stroke();
        } else if (penType == 'jvxing') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, downY);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft, downY);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop);
            ctx2.lineTo(downX, touches[0].clientY -canvasOffsetTop);
            ctx2.lineTo(downX, downY);
            ctx2.stroke();
        } else if (penType == 'fang') {
            ctx2.beginPath();
            cleanCtx();
            ctx2.moveTo(downX, downY);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft, downY);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft, downY + touches[0].clientX - canvasOffsetLeft - downX);
            ctx2.lineTo(downX, downY + touches[0].clientX - canvasOffsetLeft - downX);
            ctx2.lineTo(downX, downY);
            ctx2.stroke();
        } else if (penType == 'yuan') {
            cleanCtx();
            ctx2.beginPath();
            var radii = Math.sqrt((downX - touches[0].clientX + 98 + document.getElementById('whiteboard').offsetLeft) * (downX - touches[0].clientX + 98 + document.getElementById('whiteboard').offsetLeft) + (downY - touches[0].clientY + 60 + document.getElementById('whiteboard').offsetTop) * (downY - touches[0].clientY + 60 + document.getElementById('whiteboard').offsetTop));
            ctx2.arc(downX, downY, radii, 0, Math.PI * 2, false);
            ctx2.stroke();
        } else if (penType == 'rubber') {
            ctx2.lineWidth = 1;
            cleanCtx();
            ctx2.beginPath();
            ctx2.moveTo(touches[0].clientX - canvasOffsetLeft - penSize * 6, touches[0].clientY -canvasOffsetTop - penSize * 7);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft + penSize * 5, touches[0].clientY -canvasOffsetTop - penSize * 7);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft + penSize * 5, touches[0].clientY -canvasOffsetTop + penSize * 5);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft - penSize * 6, touches[0].clientY -canvasOffsetTop + penSize * 5);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft - penSize * 6, touches[0].clientY -canvasOffsetTop - penSize * 7);
            ctx2.stroke();
            // ctx2.clearRect(e.clientX-98 - canvasLeft - penSize * 6, e.clientY-60 - canvasTop - penSize * 6, penSize * 12, penSize * 12);
            ctx1.clearRect(touches[0].clientX - canvasOffsetLeft - penSize * 5, touches[0].clientY -canvasOffsetTop - penSize * 5, penSize * 10, penSize * 10);
        }

        socket.emit('message', downX, downY, touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop, penType, penColer, penSize, lastTime);
        console.log('发送：', downX, downY, touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop, penType, penColer, penSize, lastTime);

    } else if ((!canDraw) && downOrUp == 'up') {
        if (penType == 'yuan') {
            cleanCtx();
            ctx2.beginPath();
            ctx2.arc(touches[0].clientX - canvasOffsetLeft, touches[0].clientY -canvasOffsetTop, 10, 0, Math.PI * 2, false);
            ctx2.stroke();
        } else if (penType == 'rubber') {
            // alert("jfk");
            ctx2.lineWidth = 1;
            cleanCtx();
            ctx2.beginPath();
            ctx2.moveTo(touches[0].clientX - canvasOffsetLeft - penSize * 6, touches[0].clientY -canvasOffsetTop - penSize * 7);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft + penSize * 5, touches[0].clientY -canvasOffsetTop - penSize * 7);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft + penSize * 5, touches[0].clientY -canvasOffsetTop + penSize * 5);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft - penSize * 6, touches[0].clientY -canvasOffsetTop + penSize * 5);
            ctx2.lineTo(touches[0].clientX - canvasOffsetLeft - penSize * 6, touches[0].clientY -canvasOffsetTop - penSize * 7);
            ctx2.stroke();
        }
    }

}

//翻页
(function () {
    socket.on('fanYe', function (data) {
        console.log(data);
        if (data == 'up') {
            $("#canvas1").animate({
                top: "-=600px"
            }, 200);
            setTimeout(function () {
                cleanCtx(2);
                $("#canvas1").animate({
                    top: "+=600px"
                }, 200);
            }, 200);
        }
        if (data == 'down') {
            $("#canvas1").animate({
                top: "+=600px"
            }, 200);
            setTimeout(function () {
                cleanCtx(2);
                $("#canvas1").animate({
                    top: "-=600px"
                }, 200);
            }, 200);
        }

    })
})();


function up() {
    page++;
    maxPage = (maxPage) > page ? maxPage : page;

    console.log("maxpage:" + maxPage);
    console.log("page:" + page);
    socket.emit('fanYe', 'up');

    $("#canvas1").animate({
        top: "-=600px"
    }, 200);

    if (maxPage == page) {
        imageHis.push(canvas1.toDataURL("image/png"));

        setTimeout(function () {
            cleanCtx(2);
            $("#canvas1").animate({
                top: "+=600px"
            }, 0);
        }, 200);
    } else {
        cleanCtx();
        $("#canvas2").animate({
            top: "+=600px"
        }, 0);
        image1.src = imageHis[page];
        ctx2.drawImage(image1, 0, 0, image1.width, image1.height, 0, 0, canvasWidth, canvasHeight);

        setTimeout(function () {
            $("#canvas1").animate({
                top: "+=600px"
            }, 0);
            $("#canvas2").animate({
                top: "-=600px"
            }, 200);
        }, 0);
    }
}

function down() {
    if (page >= 1) {
        page--;
        console.log("page:" + page);
        $("#canvas1").animate({
            top: "+=600px"
        }, 200);
        cleanCtx();
        $("#canvas2").animate({
            top: "-=600px"
        }, 0);
        image1.src = imageHis[page];
        cleanCtx(2);
        ctx2.drawImage(image1, 0, 0, image1.width, image1.height, 0, 0, canvasWidth, canvasHeight);
        socket.emit('fanYe', 'down');
        setTimeout(function () {

            $("#canvas2").animate({
                top: "+=600px"
            }, 200);
            $("#canvas1").animate({
                top: "-=600px"
            }, 0)
        }, 200);
    }
}

//0828