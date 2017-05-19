$(function () {
    // 滚屏
    var swiper = new Swiper('.swiper-container-v', {
        direction: 'vertical',
        slidesPerView: "auto",
        paginationClickable: false,
        mousewheelControl: true,
        onSlideChangeEnd: function (swiper) {
            if (swiper.activeIndex == 0 || swiper.activeIndex == 1) {
                $('body .header-wrap').show();
                $('body .header-city-wrap').hide();
            } else {
                $('body .header-wrap').hide();
                $('body .header-city-wrap').show();
            }
        }
    });
    // 第五屏滚动条出现
    var swiperScrollbar = new Swiper('.swiper-container-scrollbar', {
        scrollbar: '.swiper-container-scrollbar .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        nested: true,
        // scrollbarHide: false
    });

    // 添加对比
    $(".city-info-page .compare-box1 .box-tit").click(function () {
        $(".compare-box2 .box-cont").hide();
        $(this).next().slideToggle(200);
    });
    $(".city-info-page .compare-box2 .box-tit").click(function () {
        $(".compare-box1 .box-cont").hide();
        $(this).next().slideToggle(200);
    });

    // 返回顶部
    $(".city-info-page .back-top").click(function () {
        swiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒
        $('body .header-wrap').show();
    });

    $(".city-info-page .a-link1").click(function () {
        swiper.slideTo(2, 0, false); //切换到第三个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
    $(".city-info-page .a-link2").click(function () {
        swiper.slideTo(3, 0, false); //切换到第四个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
    $(".city-info-page .a-link3").click(function () {
        swiper.slideTo(4, 0, false); //切换到第五个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
    $(".city-info-page .a-link4").click(function () {
        swiper.slideTo(5, 0, false); //切换到第六个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
    $(".city-info-page .a-link5").click(function () {
        swiper.slideTo(5, 0, false); //切换到第六个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
});