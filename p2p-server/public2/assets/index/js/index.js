/**
 * Created by luoxing on 2018/4/9 15:30
 */

$(function () {
    var $header = $("header");
    var $menubar = $header.find(".menubar");
    $("#sectionWrapper").sectionWrapper()
        .on("wheelBefore", function (msg) {
            $header.addClass("hide");

            msg.beforeIndex === 1 && msg.beforeDom.removeClass("active");
        })
        .on("wheelAfter", function (e, msg) {
            var currIndex = msg.currIndex;
            if (currIndex === 0) {
                $menubar.removeClass("black").addClass("white");
            }
            else {
                $menubar.removeClass("white").addClass("black");
                currIndex === 1 && msg.currDom.addClass("active");
            }

            $header.removeClass("hide");
        })
    ;
});