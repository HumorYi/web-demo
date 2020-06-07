
(function($) {
    $.fn.snow = function(options) {
        var $flake = $('<div id="flake" />').css({//设置雪花保存的标签
            'position': 'absolute',
            'top': '-50px'//初始top位置
        }).html('&#10052;'),//添加雪花内容
        documentHeight = $(document).height(),//获取到内容的高度
        documentWidth = $(document).width(),//获取到内容的宽度
        defaults = {//设置雪花的属性
            minSize: 10,//最小尺寸
            maxSize: 20,//最大尺寸
            newOn: 500,//雪花产生的时间
            flakeColor: "#FFFFFF"//设置雪花的颜色
        },
        options = $.extend({},//选择
        defaults, options);
        var interval = setInterval(function() {//定时器
            var startPositionLeft = Math.random() * documentWidth - 100,//初始位置
            startOpacity = 0.5 + Math.random(),//初始透明度
            sizeFlake = options.minSize + Math.random() * options.maxSize,//雪花的尺寸
            endPositionTop = documentHeight - 40,//结束的top位置
            endPositionLeft = startPositionLeft - 100 + Math.random() * 200,//结束的left位置
            durationFall = documentHeight * 10 + Math.random() * 5000;//雪花飘落高度
            $flake.clone().appendTo('body').css({
                left: startPositionLeft,
                opacity: startOpacity,
                'font-size': sizeFlake,
                color: options.flakeColor
            }).animate({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.2
            },
            durationFall, 'linear',
            function() {
                $(this).remove()
            });
        },options.newOn);
    };
})(jQuery);