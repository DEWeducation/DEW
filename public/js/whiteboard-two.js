//创建Canvas元素并监听全屏改变事件

var docment = document.documentElement;
var maximize = document.getElementById('maximize-icon');
var canvasDiv = document.getElementById('canvasDiv');

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function () {
    var isFullScreen = document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen;
    if (isFullScreen) {

        $(maximize).on('click', exitFullScreen)
        maximize.style.backgroundImage = "url(../img/whiteboard-tools/min.svg)"
        socket.emit('fullScreen',"fullScreen")  //开启全屏，发送消息给服务端    
    } else {
        $(maximize).on('click', fullScreen)
        maximize.style.backgroundImage = "url(../img/whiteboard-tools/maximize.svg)"
        socket.emit('fullScreen',"exitFullScreen")    //退出全屏，发送消息给服务端    
    }
})

function fullScreen() {
    document.requestFullscreen ? docment.requestFullscreen() :
        docment.mozRequestFullScreen ? docment.mozRequestFullScreen() :
            docment.webkitRequestFullscreen ? docment.webkitRequestFullscreen() :
                docment.msRequestFullscreen && docment.msRequestFullscreen();
}
function exitFullScreen() {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen()
}

//Insert canvas elements
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

var canvas0 = document.createElement("canvas");
canvas0.setAttribute("width", document.getElementById('canvasdiv').clientWidth);
canvas0.setAttribute("height", document.getElementById('canvasdiv').clientHeight);
canvas0.setAttribute("id", "canvas0");
canvasdiv.appendChild(canvas0);