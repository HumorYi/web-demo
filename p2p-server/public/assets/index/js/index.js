/**
 * Created by luoxing on 2018/4/9 15:30
 */

$(function() {
    var $header  = $("header"),
        $menubar = $header.find(">nav.menubar")
    ;
    $("#sectionWrapper")
        .sectionWrapper({
            show      : true,
            direction : "left",
            count     : 5,
            active    : true
        })
        .on("wheelBefore", function(e, msg) {
            // 头部菜单栏添加动画类
            $header.addClass("hide");

            // 为之前页面为第二页的元素移除动画激活类
            msg.beforeIndex === 1 && msg.beforeDom.removeClass("active");
        })
        .on("wheelAfter", function(e, msg) {
            // 头部菜单栏移除动画类
            $header.removeClass("hide");

            var currIndex = msg.currIndex;

            if (currIndex === 0) {
                // 当前页面为第一页，使用白色皮肤，移除黑色皮肤
                $menubar.addClass("white")
                        .removeClass("black");
            }
            else {
                // 当前页面不是第一页，使用黑色皮肤，移除白色皮肤
                $menubar.addClass("black")
                        .removeClass("white");
                // 为当前页面为第二页的元素添加动画激活类
                currIndex === 1 && msg.currDom.addClass("active");
            }
        })
        .on("clickBefore", function(e, msg) {
            console.log("this is clickBefore");
        })
        .on("clickAfter", function(e, msg) {
            console.log("this is clickAfter");
        })
    ;
});