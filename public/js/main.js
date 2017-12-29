/**
 * Created by Qvjunping on 2016-07-11.
 */
$(document).ready(function () {

    // $("#Xboard #pad,#allChat").draggable({ stack: "#Xboard #pad,#allChat" })
    // $("#pad").draggable({ handle: "#move" });
    // $("#allChat").draggable({ handle: "#movePhone" });

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

    $(record).on('click', function () {
        var arr = ['url("../img/whiteboard-tools/luyin.svg")', 'url("../img/whiteboard-tools/luyin2.svg")'];
        if (record.style.backgroundImage === arr[0]){
            record.style.backgroundImage = arr[1];
            //开始录音
            openAudio();
        }else{
            record.style.backgroundImage = arr[0];
            // 结束录音
            closeAudio();
        }
    });


    $('#rule').click(function () {
        $("#canvasInput").hide();
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule-2.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        // $('#shape').css("background-image", "url(../img/whiteboard-tools/shape.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        // init();
        penType = 'line';
        console.log(penType);
    });

    $('#pencil-one').click(function () {
        $("#canvasInput").hide();
        $('#pencil-one').css("background-image", "url(../img/whiteboard-tools/pen1-2.svg)");
        $('#pencil-two').css("background-image", "url(../img/whiteboard-tools/pen2.svg)");
        $('#paintbrush').css("background-image", "url(../img/whiteboard-tools/pen3.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        // $('#shape').css("background-image", "url(../img/whiteboard-tools/shape.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        penType = 'pencil';
        chooseSize('1')
        console.log("chooseSize 1")
    });

    $('#pencil-two').click(function () {
        $("#canvasInput").hide();
        $('#pencil-two').css("background-image", "url(../img/whiteboard-tools/pen2-2.svg)");
        $('#pencil-one').css("background-image", "url(../img/whiteboard-tools/pen1.svg)");
        $('#paintbrush').css("background-image", "url(../img/whiteboard-tools/pen3.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        $('#shape').css("background-image", "url(../img/whiteboard-tools/shape.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        penType = 'pencil';
        chooseSize('3')
        console.log("chooseSize 3")
    });

    $('#paintbrush').click(function () {
        $('#paintbrush').css("background-image", "url(../img/whiteboard-tools/pen3-2.svg)");
        $('#pencil-two').css("background-image", "url(../img/whiteboard-tools/pen2.svg)");
        $('#pencil-one').css("background-image", "url(../img/whiteboard-tools/pen1.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        $('#shape').css("background-image", "url(../img/whiteboard-tools/shape.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
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
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing2.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        // init();
        penType = 'sanjian';
        console.log(penType);

    });
    $('#zhijiaosanjiao').click(function (e) {
        $("#canvasInput").hide();
        e.stopPropagation();
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing2.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        // init();
        penType = 'zhijiaosanjiao';
        console.log(penType);

    });

    $('#fang').click(function (e) {
        $("#canvasInput").hide();
        e.stopPropagation();
        // init();
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing2.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        // $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");        
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        penType = 'fang';
        console.log(penType);
    });
    $('#jvxing').click(function (e) {
        $("#canvasInput").hide();
        e.stopPropagation();
        // init();
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing2.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");        
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        penType = 'jvxing';
        console.log(penType);

    });
    $('#yuan').click(function (e) {
        $("#canvasInput").hide();
        e.stopPropagation();
        // init();
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan2.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");        
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        penType = 'yuan';
    });
    $('#word').click(function () {
        $('#shape').css("background-image", "url(../img/whiteboard-tools/shape.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber.svg)");
        $('#word').css("background-image", "url(../img/whiteboard-tools/word-2.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");        
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        // init();
        // textBoxShow();
        if ($("#canvasInput").is(':visible')) {
            $("#canvasInput").hide();
        }
        else {
            $("#canvasInput").show();
        }
        penType = 'text';
    });
    $('#rubber').click(function () {
        $("#canvasInput").hide();
        $('#rubber').css("background-image", "url(../img/whiteboard-tools/rubber-2.svg)");
        $('#paintbrush').css("background-image", "url(../img/whiteboard-tools/pen3.svg)");
        $('#pencil-two').css("background-image", "url(../img/whiteboard-tools/pen2.svg)");
        $('#pencil-one').css("background-image", "url(../img/whiteboard-tools/pen1.svg)");
        $('#rule').css("background-image", "url(../img/whiteboard-tools/rule.svg)");
        $('#zhijiaosanjiao').css("background-image", "url(../img/whiteboard-tools/zhijiaosanjiaoxing.svg)");
        $('#sanjian').css("background-image", "url(../img/whiteboard-tools/sanjiaoxing.svg)");        
        $('#fang').css("background-image", "url(../img/whiteboard-tools/zhengfangxing.svg)");
        $('#yuan').css("background-image", "url(../img/whiteboard-tools/yuan.svg)");
        $('#jvxing').css("background-image", "url(../img/whiteboard-tools/changfangxing.svg)");
        $('#world').css("cursor", "pointer");
        // init();
        penType = 'rubber';
    });
    $('#clearAll').click(function () {
        $("#canvasInput").hide();
        $('#word').css("background-image", "url(../img/whiteboard-tools/word.svg)");

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