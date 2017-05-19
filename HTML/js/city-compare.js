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

    // 取消对比
    $(document).on('click', '.city-compare-page .compare-box .back', function () {
        window.history.back();
    });

    // 返回顶部
    $(".city-compare-page .back-top").click(function () {
        swiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒
        $('body .header-wrap').show();
    });

    $(".city-compare-page .a-link1").click(function () {
        swiper.slideTo(2, 0, false); //切换到第三个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
    $(".city-compare-page .a-link2").click(function () {
        swiper.slideTo(3, 0, false); //切换到第四个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
    $(".city-compare-page .a-link3").click(function () {
        swiper.slideTo(5, 0, false); //切换到第八个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
    $(".city-compare-page .a-link4").click(function () {
        swiper.slideTo(7, 0, false); //切换到第八个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
    $(".city-compare-page .a-link5").click(function () {
        swiper.slideTo(8, 0, false); //切换到第九个slide，速度为1秒
        $('body .header-wrap').hide();
        $('body .header-city-wrap').show();
    });
});