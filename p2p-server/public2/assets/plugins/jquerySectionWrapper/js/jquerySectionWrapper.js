/**
 * Created by luoxing on 2018/4/9 19:36
 */
(function (root, factory, plug) {
    factory(root.jQuery, plug);
})(window, function ($, plug) {
    var __PROTOTYPE__ = {
        _init: function () {
            this.$sectionWrap = $(".section-wrapper").find(">ul:first").addClass("section-wrap section-animate");
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

            $ul.find(">li:first").addClass("active");
            this.append($ul);

            this.$serials = $ul.find(">li");
        },
        _attachEvent: function (e, args) {
            this.trigger(e, args)
        },
        _wrap: function (e, index) {
            var _this = this,
                $sections = this.$sections,
                currIndex = this.currIndex,
                beforeIndex = this.currIndex
            ;

            if (_this.lock !== true) {
                return;
            }

            if (e.type === "mousewheel") {
                // 通过数据源对象的 deltaY 属性值来判断鼠标滚动方向
                var dir = e.originalEvent.deltaY === 100 ? "bottom" : "top";
                // 第一个元素往上滚动 和 最后一个元素往下滚动 禁止该行为
                if (currIndex === 0 && dir === "top" ||
                    currIndex === _this.endIndex && dir === "bottom"
                ) {
                    return;
                }

                dir === "bottom" ? ++currIndex : --currIndex;
            }
            else if (e.type === "click") {
                currIndex = index;
            }

            _this.lock = false;
            _this.currIndex = currIndex;

            var msg = {
                event: e,
                beforeIndex: beforeIndex,
                beforeDom: $sections.eq(beforeIndex),
                currIndex: currIndex,
                currDom: $sections.eq(currIndex)
            };

            _this._attachEvent("wheelBefore", msg);

            currIndex *= 100;
            _this.$sectionWrap.css({
                "-webkit-transform": "translateY(-" + currIndex + "%)",
                "-moz-transform": "translateY(-" + currIndex + "%)",
                "-ms-transform": "translateY(-" + currIndex + "%)",
                "-o-transform": "translateY(-" + currIndex + "%)",
                "transform": "translateY(-" + currIndex + "%)"
            });

            _this.timer = setTimeout(function () {
                _this.lock = true;

                _this._attachEvent("wheelAfter", msg);

                if (_this.show === true) {
                    _this.$serials.eq(beforeIndex).removeClass("active");
                    _this.$serials.eq(_this.currIndex).addClass("active");
                }
            }, 1000);

        },
        _bind: function () {
            var _this = this;

            // 鼠标滚动事件
            _this.on("mousewheel", function (e) {
                _this._wrap(e);
            });

            // 没有启动点击小圆圈事件
            if (!(_this.show === true && _this.active === true)) {
                return;
            }

            // 小圆圈点击事件
            _this.on("click", ">ul.serial > li:not(.active)", function (e) {
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