/**
 * Created by Qvjunping on 2016-07-11.
 */
var padMax = 0;
$("#closePad").click(function () {
    $("#pad").hide(500);
    // $("#openPad").show(1200)
});
$("#openPad").click(function () {
    $("#pad").show(500);
    // $("#openPad").hide(500)
});

$("#shape").bind('mouseover', function () {
    $("#shape div").css({
        display: "block"
    });
    // alert("j")

});
$("#shape").bind('mouseout', function () {
    $("#shape div").css({
        display: "none"
    });
    // alert("j")

});


$("#colLine").bind('mouseover', function () {
    $("#colLine div").css({
        display: "block"
    })
});
$("#colLine").bind('mouseout', function () {
    $("#colLine div").css({
        display: "none"
    });
});
$("#colorbar").bind('mouseover', function () {
    $("#colorbar div").css({
        display: "block"
    })
});
$("#colorbar").bind('mouseout', function () {
    $("#colorbar div").css({
        display: "none"
    });
});

$("#sizebar").bind('mouseover', function () {
    $("#sizebar div").css({
        display: "block"
    })
});
$("#sizebar").bind('mouseout', function () {
    $("#sizebar div").css({
        display: "none"
    });
});

$("#color").hover(function () {
    $(".colpick_hue").css("display", "block")
    // $(".colpick_hex_field").css("display","block")
},function(){
    $(".colpick_hue").hover(function () {
        $(".colpick_hue").css("display", "block")
        // $(".colpick_hex_field").css("display","block")
    },function(){
        $(".colpick_hue").css("display", "none");
    })
}
);

    // function () {
    //     setTimeout(function () {
    //         $(".colpick_hue").css("display", "none")
    //     }, 2000)
    //     //  $(".colpick_hex_field").css("display","none")
    // })

$("#maxPad").bind('click', function (e) {
    if (padMax % 2 == 1) {//变小
        $("#audioPhone,#closePad").animate({
            left: 400
        }, 200);
        $("#up,#down").animate({
            left: 840
        }, 100);
        $("#pad").css({
            width: 830,
            height: 600,
            top: 100
        });
        $("canvas").attr({
            width: 790,
            height: 600
        });
        canvasWidth = 790;
        canvasHeight = 600;
    } else if (padMax % 2 == 0) {//变大
        $("#audioPhone,#closePad").animate({
            left: 3 / 5 * (document.body.scrollHeight - 120)
        });
        $("#up,#down").animate({
            left: 4 / 3 * (document.body.scrollHeight - 120) + 10
        });
        $("#pad").css({
            height: document.body.scrollHeight - 120,
            width: 4 / 3 * (document.body.scrollHeight - 120),
            // width: document.body.scrollWidth - 500,
            top: 0
        });
        $("canvas").attr({
            height: document.body.scrollHeight - 120,
            width: 4 / 3 * (document.body.scrollHeight - 120) - 40,
            // width: document.body.scrollWidth - 540,
        });
        canvasWidth = 4 / 3 * (document.body.scrollHeight - 120) - 40;
        canvasHeight = document.body.scrollHeight - 120;
        // canvasHeight = document.body.scrollHeight - 120;
    }
    padMax++;
    console.log(padMax % 2)

});
