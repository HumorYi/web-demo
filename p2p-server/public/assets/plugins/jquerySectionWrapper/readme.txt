1、what: 这是一个基于jquery开发的全屏滚动插件，滚动切换时有简单动画效果
    滚动方式：
        1、有鼠标滚动切换
        2、激活小圆圈时点击小圆圈切换
2、when: 全屏滚动切换页面数据
3、where: 首页、产品展示页等
4、how:
    4.1、html
        4.1.1、在header里面引入jquerySectionWrapper.css
        4.1.2、
            <div id="sectionWrapper" class="section-wrapper">
                <ul class="sectionWrap">
                    <li class="sectionOne">
                        <video src="assets/index/video/banner.mp4" autoplay loop>您的浏览器版本不支持播放功能，请更新至最新版本，谢谢!</video>
                        <div class="layer"></div>
                    </li>
                    <li class="sectionTwo">
                        <img src="assets/index/images/quxian.png" alt="权限" class="qx animate-bezier">
                        <img src="assets/index/images/table.png" alt="博阿格" class="tb animate-bezier">
                    </li>
                    <li class="sectionThree"></li>
                    <li class="sectionFour"></li>
                    <li class="sectionFive"></li>
                </ul>
            </div>

            解析：一个类名为 section-wrapper 的父元素，需要滚动的数据列表放在 父元素下的 第一个ul元素中，滚动数据放在 ul元素下的li标签内
    4.2、css 使用jquerySectionWrapper.css
    4.3、js
        4.3.1、先引入jquery.js，再引入jquerySectionWrapper.js
        4.3.2、调用元素必须是 包含类名为 section-wrapper 元素 且 该元素必须是上述html机构，调用方式为：
            注意：如果要传递options参数，必须传一个对象，否则插件内部会自动把该参数置为空对象
                options用于传递用户配置，如果不传options，则使用插件内部默认配置，
                只有传递与默认值同名属性才有效，其它属性名不做处理。

            默认配置为：{
                          show      : true, // 是否显示小圆圈
                          active    : true, // 是否激活小圆圈点击事件，若激活，则show必须为true
                          direction : "right", // 小圆圈显示位置，默认为右边，可在"left","right","top","bottom"四个方向中选一个
                          count     : 5 // 小圆圈显示数量，便于动态传输数据（后台）
                      }

            $(".section-wrapper")
                    .sectionWrapper(options)
                    .on("wheelBefore", function(e, msg) {
                        console.log("鼠标滚动之前事件处理");
                    })
                    .on("wheelAfter", function(e, msg) {
                        console.log("鼠标滚动之后事件处理");
                    })
                    .on("clickBefore", function(e, msg) {
                        console.log("点击小圆圈滚动之前事件处理，只有 show === true && active === true 时，才有效，");
                    })
                    .on("clickAfter", function(e, msg) {
                        console.log("点击小圆圈滚动之后事件处理，只有 show === true && active === true 时，才有效，");
                    })
                ;