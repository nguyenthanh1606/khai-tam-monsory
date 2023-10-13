$(window).scroll(function() {
    if ($(this).scrollTop() > 2e3 ? $(".deal.one").addClass("dealfixed") : $(".deal.one").removeClass("dealfixed"),
    $(this).scrollTop() > 500) {
        var o = $("#topcControl");
        o.fadeIn(),
        $(".top-nav-wrap").addClass("fix"),
        $(".main-nav-wrap").addClass("fix")
    } else
        $("#topcControl").fadeOut(),
        $(".top-nav-wrap").removeClass("fix"),
        $(".main-nav-wrap").removeClass("fix");
    widthpx = $(window).width() + 11,
    widthpx <= 680 && ($(this).scrollTop() > 500 ? ($(".top-nav-wrap").addClass("mb"),
    $("#mbmenu").fadeIn(),
    $(".menumb-icon").hide()) : ($(".top-nav-wrap").removeClass("mb"),
    $("#mbmenu").fadeOut(),
    $(".menumb-icon").show(),
    $("#main-nav").removeClass("navfix")))
}),
$(document).ready(function() {
    $(".product .deal .info .price").click(function() {
        $(this).parent().parent().children(".img").children(".priceinfo").toggle()
    }),
    $("#mbmenu").click(function() {
        $("#main-nav").addClass("navfix")
    }),
    $(".btn_top").click(function() {
        return $("html, body").animate({
            scrollTop: 0
        }, 500),
        !1
    }),
    $(".btn_down").click(function() {
        return $("html, body").animate({
            scrollTop: $(document).height()
        }, 500),
        !1
    }),
    $(".account-info").hover(function() {
        $(this).children("div").stop(!0, !0).fadeIn("slow")
    }, function() {
        $(this).children("div").stop(!0, !0).fadeOut("fast")
    }),
    $("#viewMoreContent").click(function() {
        "expandOpen" == $(this).attr("class") ? ($(this).attr("class", "expandClose"),
        $(".content-more").css({
            "max-height": "none"
        }),
        $(this).html("Thu gọn hình ảnh sản phẩm ▲")) : "expandClose" == $(this).attr("class") && ($(this).attr("class", "expandOpen"),
        $("html, body").animate({
            scrollTop: 3200
        }, 500),
        $(".content-more").removeAttr("style"),
        $(this).html("Hiển thị thêm hình ảnh sản phẩm ▼"))
    }),
    $("#contentSupport").mCustomScrollbar({
        scrollButtons: {
            enable: !0,
            scrollType: "stepped"
        },
        keyboard: {
            scrollType: "stepped"
        },
        mouseWheel: {
            scrollAmount: 188
        },
        theme: "rounded-dark",
        autoExpandScrollbar: !0,
        snapAmount: 188,
        snapOffset: 65
    });
    var o = $.session.get("close_popupleft");
    "1" == o && ($(".box-fb-page").css({
        bottom: "60px",
        right: "10px"
    }),
    $(".btnphone").show(),
    $(".persion-support").hide(),
    $(".close_popup").html('<i class="fa fa-times"><img class="icon-cancel" src="/public/images/icon-cancel.png" /></i>')),
    $(".close_popupleft").click(function() {
        var o = $(".box-fb-page").css("bottom");
        "-295px" == o ? ($.session.set("close_popupleft", "1"),
        $(".box-fb-page").animate({
            bottom: "60px",
            right: "10px"
        }, 300),
        $(".btnphone").show(),
        $(".persion-support").hide(),
        $(".close_popup").html('<i class="fa fa-times"><img class="icon-cancel" src="/public/images/icon-cancel.png" /></i>')) : ($.session.set("close_popupleft", "0"),
        $(".box-fb-page").animate({
            bottom: "-295px",
            right: "32px"
        }, 300),
        $(".btnphone").hide(),
        $(".persion-support").show(),
        $(".close_popup").html(""))
    }),
    $(".persion-support").click(function() {
        var o = $(".box-fb-page").css("bottom");
        "-295px" == o && ($.session.set("close_popupleft", "1"),
        $(".box-fb-page").animate({
            bottom: "60px",
            right: "10px"
        }, 300),
        $(".btnphone").show(),
        $(this).hide(),
        $(".close_popup").html('<i class="fa fa-times"><img class="icon-cancel" src="/public/images/icon-cancel.png" /></i>'))
    }),
    $(".sptitle").click(function() {
        var o = $(".support-home").css("right");
        "0px" == o ? ($(".support-home").animate({
            right: "-233px"
        }, 300),
        $(this).removeClass("an"),
        $(this).css({
            background: "url(/public/images/support-hien2.png)"
        })) : ($(this).addClass("an"),
        $(".support-home").animate({
            right: "0px"
        }, 300),
        $(this).css({
            background: "url(/public/images/support-an2.png)"
        }))
    }),
    $(".modal").click(function() {
        var o = $(this).attr("href");
        return widthparam = 480,
        heightparam = 450,
        widthpx = $(window).width() + 11,
        widthpx <= 400 && (widthparam = 300,
        heightparam = 450),
        $("#divmodel").load(o).dialog({
            height: heightparam,
            width: widthparam,
            zIndex: 9999999,
            modal: !0,
            buttons: {
                "Đóng": function() {
                    $(this).dialog("close")
                },
                "Gửi yêu cầu": function() {
                    "" == $("#consulting_fullname").val() ? $("#consulting_fullname").css({
                        "border-color": "red"
                    }) : $("#consulting_fullname").css({
                        "border-color": "#e5e5e5"
                    }),
                    "" == $("#consulting_phone").val() ? $("#consulting_phone").css({
                        "border-color": "red"
                    }) : $("#consulting_phone").css({
                        "border-color": "#e5e5e5"
                    }),
                    "" == $("#consulting_comment").val() ? $("#consulting_comment").css({
                        "border-color": "red"
                    }) : $("#consulting_comment").css({
                        "border-color": "#e5e5e5"
                    }),
                    "" != $("#consulting_fullname").val() && "" != $("#consulting_phone").val() && "" != $("#consulting_comment").val() && $.ajax({
                        url: "/member/index/register-consulting-ajax",
                        type: "POST",
                        data: $("#registerConsulting").serialize(),
                        dataType: "json",
                        error: function(o, e, n) {
                            alert("Có lỗi sảy ra: " + n)
                        },
                        success: function() {
                            $("#divmodel").dialog("close"),
                            $("#divmodel").html("<div style='width:295px'>Thành Công!<br/>Chúng tôi sẽ cho gọi bạn sau ít phút.<br/>Xin Cám Ơn !</div>").dialog({
                                width: 320,
                                height: 250,
                                zIndex: 9999999,
                                modal: !0,
                                buttons: !1
                            })
                        }
                    })
                }
            }
        }),
        !1
    })
});
