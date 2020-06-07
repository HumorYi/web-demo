/**
 * Created by luoxing on 2018/4/9 19:36
 */

(function (root, factory, plug) {
    factory(root.jQuery, plug);
})(window, function ($, plug) {
    // 扩展原型
    var __PROTOTYPE__ = {
        _init: function () {
            this.$sectionWrap = $(".section-wrapper").find(">ul:first").addClass("section-wrap section-animate");
            this.$sections = this.$sectionWrap.find(">li").addClass("section");

            this.currIndex = 0;
            this.endIndex = this.$sections.length - 1;
            this.lock = true;
        },
        _bind: function () {
            var _this = this;

            _this.on("mousewheel", function (e) {
                _this._wrap(e);
            });

            if (!(_this.show === true && _this.active === true)) {
                return;
            }

            _this.on("click", ">ul.serial > li:not(.active)", function (e) {
                _this._wrap(e, $(this).index());
            });
        },
        _wrap: function (e, index) {
            var _this = this,
                currIndex = this.currIndex,
                beforeIndex = this.currIndex,
                $sections = this.$sections
            ;

            // 防止滚动未完成时再次触发
            if (_this.lock !== true) {
                return;
            }

            switch (e.type) {
                case "mousewheel":
                    console.log(1);
                    // 通过事件的源事件对象中的 deltaY 属性来判断鼠标滚动方向
                    var dir = e.originalEvent.deltaY === 100 ? "bottom" : "top";
                    // 边界值进制滚动
                    // 第一个元素往上滚动 和 最后一个元素往下滚动
                    if (currIndex === 0 && dir === "top" ||
                        currIndex === _this.endIndex && dir === "bottom"
                    ) {
                        return;
                    }

                    dir === "bottom" ? ++currIndex : --currIndex;
                    break;
                case "click":
                    currIndex = index;
                    break;
                default:
                    throw new Error("invalid event type === " + e.type);
            }

            _this.lock = false;

            var msg = {
                event: e,
                beforeIndex: beforeIndex,
                beforeDom: $sections.eq(beforeIndex),
                currIndex: currIndex,
                currDom: $sections.eq(currIndex)
            };

            // 滚动之前事件处理
            _this._attachEvent("wheelBefore", msg);

            // 开始滚动
            _this.currIndex = currIndex;

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

                if ( _this.show === true) {
                    _this.$serials.eq(beforeIndex).removeClass("active");
                    _this.$serials.eq(_this.currIndex).addClass("active");
                }
            }, 1000);
        },
        _attachEvent: function (e, args) {
            this.trigger(e, args);
        },
        _generateSerial: function (direction, count) {
            count = count || 5;
            var directions = {
                "left": "left",
                "right": "right",
                "top": "top",
                "bottom": "bottom"
            };

            console.log(directions[direction]);
            var $ul = $("<ul></ul>");
            $ul.addClass("serial " + directions[direction]);

            for (var i = 0; i < count; i++) {
                $ul.append($("<li></li>"));
            }

            $ul.find(">li:first").addClass("active");
            this.append($ul);

            this.$serials = $ul.find(">li");
        }
    };

    // 默认配置
    var __DEFAULTS__ = {
        show: true,
        active: true,
        direction: "right"
    };

    $.fn[plug] = function (options) {
        $.extend(this, __DEFAULTS__, options || {}, __PROTOTYPE__);
        this._init();
        this._bind();
        this.show === true && this._generateSerial(this.direction, this.count);

        return this;
    };
}, "sectionWrapper");