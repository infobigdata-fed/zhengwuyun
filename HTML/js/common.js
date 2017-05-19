$(function () {
    // 顶部搜索框淡入淡出
    $(".header-search-box .search-icon").click(function () {
        $(this).toggle().next().show(200);
    });
});