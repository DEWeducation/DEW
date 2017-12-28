var fuck_canvas = document.getElementById('fuck-canvas');

// Insert canvas elements
var whiteboard = document.getElementById('whiteboard');

// 画2上
var canvas2 = document.createElement("canvas");
canvas2.setAttribute("width", whiteboard.clientWidth);
canvas2.setAttribute("height", whiteboard.clientHeight);
canvas2.setAttribute("id", "canvas2");
whiteboard.appendChild(canvas2);

// 印1山
var canvas1 = document.createElement("canvas");
canvas1.setAttribute("width", whiteboard.clientWidth);
canvas1.setAttribute("height", whiteboard.clientHeight);
canvas1.setAttribute("id", "canvas1");
whiteboard.appendChild(canvas1);

// 本来的翻页，现在保留
var canvas0 = document.createElement("canvas");
canvas0.setAttribute("width", whiteboard.clientWidth);
canvas0.setAttribute("height", whiteboard.clientHeight);
canvas0.setAttribute("id", "canvas0");
whiteboard.appendChild(canvas0);


function newPageLocal(resove) { //如果resove === "send"，则是接收，否则是自己点击新增一页
    $("#contents").children().each(function (i, n) {
        $(n).removeClass("boxShadow")
    })
    event.stopPropagation();
    var addDiv = document.getElementById('add').parentNode;
    var content = addDiv.parentNode;
    var newItem = document.createElement("div");
    newItem.setAttribute("class", "canvas-item boxShadow");
    content.insertBefore(newItem, addDiv);

    if (resove != "send") {
        // 发送新页给其他人
        newPage();
    }

    $(".canvas-item").on("click", function () {
        var index = $(".canvas-item").index(this);


        $("#contents").children().each(function (i, n) {
            $(n).removeClass("boxShadow")
        })
        $(this).addClass("boxShadow")
        // alert(index);

        if (resove != "send") {
            jumpPage(index); //发送给别人
        }
        fuckJump(index); // 自己跳
    });

    var ctx1 = document.getElementById("canvas1").getContext("2d")
    ctx1.beginPath();
    ctx1.strokeStyle = "#ccc"
    ctx1.moveTo(50, canvas0.height);
    ctx1.lineTo(1000, canvas0.height);
    ctx1.stroke();
    ctx1.closePath();
    var data = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);


    fuck_ctx = document.getElementById("fuck-canvas").getContext("2d");
    var last_data = ctx1.getImageData(0, canvas0.height - whiteboard.clientHeight, canvas1.width, canvas1.height)
    fuck_ctx.putImageData(last_data, 0, 0);

    $('#contents div').last().prev('div').prev('div').css("background-image", 'url("' + fuck_canvas.toDataURL() + '")');

    // 增大画布
    canvas0.setAttribute("height", canvas0.height + whiteboard.clientHeight)
    canvas1.setAttribute("height", canvas1.height + whiteboard.clientHeight)
    canvas2.setAttribute("height", canvas2.height + whiteboard.clientHeight)
    ctx1.putImageData(data, 0, 0)

    // 自动滚动到末尾
    addDiv.parentNode.scrollTop = addDiv.parentNode.scrollHeight;
    canvas0.parentNode.scrollTop = canvas0.parentNode.scrollHeight;

}
// 点击add按钮，新添一页
addButton = document.getElementById('add');
addButton.addEventListener("click", newPageLocal, false);

// 选中缩略图显示阴影
function addBoxShadow() {
    $(".canvas-item").mouseover(function () {
        $(this).addClass("boxShadow");
    }).mouseout(function () {
        $(this).removeClass("boxShadow");
    })
}

// 测试方法 
function exportCanvasAsPNG(id, fileName) {

    var canvasElement = document.getElementById(id);

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

function fuckJump(pageNum) {
    canvas0.parentNode.scrollTop = pageNum * whiteboard.clientHeight;
    document.getElementById('add').parentNode.parentNode.scrollTop = (pageNum - 1) * fuck_canvas.height;
}

