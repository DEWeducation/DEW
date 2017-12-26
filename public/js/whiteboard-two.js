//创建Canvas元素并监听全屏改变事件

var docment = document.documentElement;
var maximize = document.getElementById('maximize-icon');
var video = document.getElementById('video-icon');
var canvasDiv = document.getElementById('canvasDiv');

// $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function () {
//     var isFullScreen = document.fullScreen ||
//         document.mozFullScreen ||
//         document.webkitIsFullScreen;
//     if (isFullScreen) {

//         $(maximize).on('click', exitFullScreen)
//         maximize.style.backgroundImage = "url(../img/pause.png)"
//         video.style.backgroundImage = "url(../img/whiteboard-tools/video.svg)"
//         socket.emit('fullScreen', "fullScreen")  //开启全屏，发送消息给服务端    
//     } else {
//         $(maximize).on('click', fullScreen)
//         maximize.style.backgroundImage = "url(../img/play.png)"
//         video.style.backgroundImage = null;
//         socket.emit('fullScreen', "exitFullScreen")    //退出全屏，发送消息给服务端    

//     }
// })
$(maximize).on('click', function () {
    var arr = ['url("../img/pause.png")', 'url("../img/play.png")'];
    maximize.style.backgroundImage = maximize.style.backgroundImage === arr[0] ? arr[1] : arr[0];
});
function fullScreen() {
    return false; // 


    document.requestFullscreen ? docment.requestFullscreen() :
        docment.mozRequestFullScreen ? docment.mozRequestFullScreen() :
            docment.webkitRequestFullscreen ? docment.webkitRequestFullscreen() :
                docment.msRequestFullscreen && docment.msRequestFullscreen();
    // FULLSCREEN = true;
    // openAudio()
    console.log("YES: "+canvasdiv.clientHeight);
    // canvas0.setAttribute("width", 817)
    // canvas1.setAttribute("width", 817)
    // canvas2.setAttribute("width", 817) + 114  !760
    canvas0.setAttribute("height", canvasHeight+ 114)
    canvas1.setAttribute("height", canvasHeight+ 114)
    canvas2.setAttribute("height", canvasHeight+ 114)
}
function exitFullScreen() {
    canvas0.setAttribute("height", canvasHeight)
    canvas1.setAttribute("height", canvasHeight)
    canvas2.setAttribute("height", canvasHeight) 
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen();
    // closeAudio()
    // FULLSCREEN = false;
    canvasOffsetTop = canvasOffsetTopStatic;
    console.log("canvasOffsetTopStatic" + canvasOffsetTop)
    var r = confirm("是否观看记录!");
    if (r == true) {
        window.location.href='/profile';
    }
    else {
        
    }

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