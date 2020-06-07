/**
 * Created by luoxing on 2018/4/9 15:30
 */
$(function () {
    var $header = $("header");
    var $menu = $header.find("nav.menubar");
    $("#section-wrapper").sectionWrapper()
        .on("wheelBefore", function (e, msg) {
            $header.addClass("hide");
            msg.beforeIndex === 1 && msg.beforeDom.removeClass("active");
        })
        .on("wheelAfter", function (e, msg) {
            var currIndex = msg.currIndex;
            if (currIndex === 0) {
                $menu.removeClass("black").addClass("white");
            }
            else {
                $menu.removeClass("white").addClass("black");
                currIndex === 1 && msg.currDom.addClass("active");
            }

            $header.removeClass("hide");
        })
    ;
});