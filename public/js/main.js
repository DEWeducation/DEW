/**
 * Created by Qvjunping on 2016-07-11.
 */
$(document).ready(function () {

    $("#Xboard #pad,#allChat").draggable({ stack: "#Xboard #pad,#allChat" })
    $("#pad").draggable({ handle: "#move" });
    $("#allChat").draggable({ handle: "#movePhone" });

    $("#canvasInput").hide();
    $("#pad").hide();
    // var init = function init() {

    $("#canvasInput").hide();
    $('#canvas2').unbind();
    $('#canvas2').bind('mousedown', mouseDown);
    $('#canvas2').bind('mousemove', mouseMove);
    $('#canvas2').bind('mouseup', mouseUp);
    $('#canvas2').bind('mouseout', mouseOut);


    //触摸
    canvas2.addEventListener("touchstart", handleStart, false);
    canvas2.addEventListener("touchend", handleEnd, false);
    canvas2.addEventListener("touchcancel", handleCancel, false);
    canvas2.addEventListener("touchleave", handleLeave, false);
    canvas2.addEventListener("touchmove", handleMove, false);

    // };



   

    $("#btnidid").click(function () {
        reAudio();
    });

    $('#rule').click(function () {
        $("#canvasInput").hide();

        // init();
        penType = 'line';
        console.log(penType);
    });

    $('#pencil-one').click(function () {
        $("#canvasInput").hide();
        penType = 'pencil';
        chooseSize('1')
        console.log("chooseSize 1")
    });

    $('#pencil-two').click(function () {
        $("#canvasInput").hide();
        penType = 'pencil';
        chooseSize('3')
        console.log("chooseSize 3")
    });

    $('#paintbrush').click(function () {
        $("#canvasInput").hide();
        penType = 'pencil';
        chooseSize('5')
        console.log("chooseSize 5")
    });

    $('#pencil').click(function () {
        $("#canvasInput").hide();

        // init();
        penType = 'pencil';
        console.log(penType);

    });
    $('#sanjian').click(function () {
        $("#canvasInput").hide();

        // init();
        penType = 'sanjian';
        console.log(penType);

    });
    $('#zhijiaosanjiao').click(function (e) {
        $("#canvasInput").hide();
        e.stopPropagation();
        // init();
        penType = 'zhijiaosanjiao';
        console.log(penType);

    });

    $('#fang').click(function (e) {
        $("#canvasInput").hide();
        e.stopPropagation();
        // init();
        penType = 'fang';
        console.log(penType);
    });
    $('#jvxing').click(function (e) {
        $("#canvasInput").hide();
        e.stopPropagation();
        // init();
        penType = 'jvxing';
        console.log(penType);

    });
    $('#yuan').click(function (e) {
        $("#canvasInput").hide();
        e.stopPropagation();
        // init();
        penType = 'yuan';
    });
    $('#word').click(function () {

        // init();
        textBoxShow();
        penType = 'text';
    });
    $('#rubber').click(function () {
        $("#canvasInput").hide();

        // init();
        penType = 'rubber';
    });
    $('#clearAll').click(function () {
        $("#canvasInput").hide();

        // init();
        cleanCtx(canvas1);
        socket.emit('message', '', '', '', '', 'clearAll', '', '', new Date().getTime());
    });
    $('#recover').click(function () {
        $("#canvasInput").hide();
        reDraw();
    });
    $("#reAudioAndDraw").click(function () {
        reVideo();
    });

    $("#up").click(function () {
        up();
    });
    $("#down").click(function () {
        down();
    });

    $("#shape").bind('mouseover', function () {
        $("#shape div").css({
            display: "block"
        });

    });
    $("#shape").bind('mouseout', function () {
        $("#shape div").css({
            display: "none"
        });

    });

});