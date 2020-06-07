/**
 * Created by luoxing on 2018/4/9 19:36
 */

(function (root, factory, plug) {
    factory(root.jQuery, plug);
})(window, function ($, plug) {
    var __PROTOTYPE__ = {
        _init: function () {
            // 获取ul元素
            this.$sectionWrap = $(".section-wrapper").find(">ul:first").addClass("section-wrap section-animate");
            // 获取所有的li元素
            this.$sections = this.$sectionWrap.find(">li").addClass("section");
            this.currIndex = 0;
            this.endIndex = this.$sections.length - 1;
            this.lock = true;
        },
        _generateSerial: function (count) {
            count = count || 5;
            var $ul = $("<ul></ul>");
            $ul.addClass("serial");

            for (var i = 0; i < count; i++) {
                $ul.append($("<li></li>"));
            }

            // 默认第一个为激活状态
            $ul.find("li:first").addClass("active");

            this.append($ul);

            this.$serials = $ul.find(">li");
        },
        _attachEvent: function (e, args) {
            this.trigger(e, args);
        },
        _wrap: function (e, index) {
            var _this = this,
                $sections = this.$sections,
                startIndex = this.currIndex,
                beforeIndex = this.currIndex
            ;

            if (_this.lock !== true) {
                return;
            }

            if (e.type === "mousewheel") {
                var dir = e.originalEvent.deltaY === 100 ? "bottom" : "top";
                // 第一个往上滚动 和 最后一个往下滚动 不做滚动处理
                if (startIndex === 0 && dir === "top" ||
                    startIndex === this.endIndex && dir === "bottom"
                ) {
                    return;
                }

                /* 鼠标滚动事件，通过e.originalEvent.deltaY的值 可以判断鼠标滚动方向
                    向上滚动值为：-100；
                    向下滚动值为：100；
                */
                dir === "bottom" ? ++startIndex : --startIndex;
            }
            else if (e.type === "click") {
                startIndex = index;
            }

            this.lock = false;
            var msg = {
                event: e,
                beforeIndex: beforeIndex,
                beforeDom: $sections.eq(beforeIndex),
                currIndex: startIndex,
                currDom: $sections.eq(startIndex)
            };

            _this._attachEvent("wheelBefore", msg);

            _this.currIndex = startIndex;
            startIndex *= 100;

            _this.$sectionWrap.css({
                "transform": "translateY(-" + startIndex + "%)",
                "-moz-transform": "translateY(-" + startIndex + "%)",
                "-webkit-transform": "translateY(-" + startIndex + "%)",
                "-o-transform": "translateY(-" + startIndex + "%)"
            });

            _this.timer = setTimeout(function () {
                _this.lock = true;
                _this._attachEvent("wheelAfter", msg);

                if (_this.show) {
                    _this.$serials.eq(_this.currIndex).addClass("active");
                    _this.$serials.eq(beforeIndex).removeClass("active");
                }
            }, 1000);
        },
        _bind: function () {
            var _this = this;
            // 鼠标滚动事件
            this.on("mousewheel", function (e) {
                _this._wrap(e);
            });

            if (!(this.show === true && this.active === true)) {
                return;
            }

            // 点击小圆圈激活事件
            _this.on("click", "ul.serial > li:not(.active)", function (e) {
                _this._wrap(e, $(this).index());
            });
        }
    };

    var __DEFAULTS = {
        show: true,
        active: true
    };

    $.fn[plug] = function (options) {
        $.extend(this, __DEFAULTS, options || {}, __PROTOTYPE__);

        this._init();
        this._bind();
        this.show === true && this._generateSerial(this.count);
        return this;
    };
}, "sectionWrapper");