/**
 * Created by luoxing on 2018/4/9 19:36
 */

(function(root, factory, plug) {
    factory(root.jQuery, plug);
})(window, function($, plug) {
    var __DEFAULTS__ = {
        show      : true,
        active    : true,
        direction : "right",
        count     : 5
    };

    var __PROTOTYPE__ = {
        _init           : function() {
            this.$sectionWrap = $(".section-wrapper")
                .find(">ul:first")
                .addClass("section-wrap section-animate");
            this.$sections = this.$sectionWrap.find(">li")
                                 .addClass("section");
            this.currIndex = 0;
            this.endIndex = this.$sections.length - 1;
            this.lock = true;
        },
        _bind           : function() {
            var _this = this;

            _this.on("mousewheel", function(e) {
                _this._wrap(e);
            });

            // 只有显示并激活小圆圈按钮功能才执行下面的小圆圈点击事件
            if (!(_this.show === true && this.active === true)) {
                return;
            }

            _this.on("click", ">ul.serial > li:not(.active)", function(e) {
                _this._wrap(e, $(this)
                    .index());
            });
        },
        _wrap           : function(e, index) {
            var _this       = this,
                currIndex   = this.currIndex,
                beforeIndex = this.currIndex,
                $sections   = this.$sections,
                $serials    = this.$serials
            ;

            // 未开启滚动时，不做任何处理，直接退出
            if (this.lock !== true) {
                return;
            }

            // 便于后续扩展事件类型
            switch (e.type) {
                case "mousewheel":
                    // 鼠标滚动事件，通过鼠标滚动事件的源对象事件的deltaY 属性值来判定滚动方向
                    var dir = e.originalEvent.deltaY === 100 ? "bottom" : "top";

                    // 滚动到边界时禁止滚动
                    // 第一个元素往上滚动 或 最后一个元素往下滚动
                    if (currIndex === 0 && dir === "top" ||
                        currIndex === this.endIndex && dir === "bottom"
                    ) {
                        return;
                    }

                    dir === "bottom" ? ++currIndex : --currIndex;
                    break;
                case "click":
                    currIndex = index;
                    break;
                default:
                    throw new Error("invaild e.type === " + e.type);
            }

            var msg = {
                event       : e,
                beforeIndex : beforeIndex,
                beforeDom   : $sections.eq(beforeIndex),
                currIndex   : currIndex,
                currDom     : $sections.eq(currIndex)
            };

            // 滚动之前处理事件抛给用户自处理
            _this._attachEvent("wheelBefore", msg);

            // 如果开启激活滚动事件，则把点击小圆圈进行滚动之前的事件抛给用户自处理
            if (this.show === true && this.active === true) {
                _this._attachEvent("clickBefore", msg);
            }

            // 开始滚动
            _this.lock = false;
            _this.currIndex = currIndex;

            currIndex *= 100;

            _this.$sectionWrap.css({
                "-webkit-transform" : "translateY(-" + currIndex + "%)",
                "-moz-transform"    : "translateY(-" + currIndex + "%)",
                "-ms-transform"     : "translateY(-" + currIndex + "%)",
                "-o-transform"      : "translateY(-" + currIndex + "%)",
                "transform"         : "translateY(-" + currIndex + "%)"
            });

            _this.timer = setTimeout(function() {
                // 滚动完毕，开启滚动
                _this.lock = true;

                // 滚动之后的处理事件抛给用户 自处理
                _this._attachEvent("wheelAfter", msg);

                // 如果开启激活滚动事件，则把点击小圆圈进行滚动之后的事件抛给用户自处理
                if (_this.show === true && _this.active === true) {
                    _this._attachEvent("clickAfter", msg);
                }

                // 如果启动显示小圆圈按钮，则为之前已添加激活状态类的小圆圈移除激活状态类,为当前小圆圈添加激活状态类
                if (_this.show === true) {
                    _this.$serials.eq(beforeIndex)
                         .removeClass("active");
                    _this.$serials.eq(_this.currIndex)
                         .addClass("active");
                }
            }, 1000);
        },
        _attachEvent    : function(e, args) {
            this.trigger(e, args);
        },
        _generateSerial : function(direction, count) {
            var $ul = $("<ul></ul>");
            $ul.addClass("serial " + direction);
            for (var i = 0; i < count; i++) {
                $ul.append($("<li></li>"));
            }

            // 默认激活第一个按钮
            $ul.find(">li:first")
               .addClass("active");

            this.append($ul);

            this.$serials = $ul.find(">li");
        }
    };

    $.fn[plug] = function(options) {
        if ($.type(options) !== "object") {
            options = {};
        }

        $.extend(this, __DEFAULTS__, options, __PROTOTYPE__);

        this._init();
        this._bind();
        this.show === true && this._generateSerial(this.direction, this.count);

        return this;
    };
}, "sectionWrapper");