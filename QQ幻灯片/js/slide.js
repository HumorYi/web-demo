/**
 * Created by luoxing on 2018/2/27 3:10
 */

// 模拟从后台接收数据，实现动态数据展示`
window.onload = function () {

    // 幻灯片数据
    var slides = [
        {
            "small": {
                "src": "images/ico_1.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_1.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《武则天秘史》[至22集]姐姐与皇上偷情，媚娘抓奸在床..."
            }
        },
        {
            "small": {
                "src": "images/ico_2.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_2.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《无底洞》金钱、美女、权利、复仇等欲望让人不可自拔..."
            }
        },
        {
            "small": {
                "src": "images/ico_3.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_3.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《巴黎宝贝》邓超巴黎当奶爸，上演基情、卖萌、跨国恋.."
            }
        },
        {
            "small": {
                "src": "images/ico_4.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_4.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《我的女儿是花儿》[至3集]“富二代”冰王子恋上贫家女.."
            }
        },
        {
            "small": {
                "src": "images/ico_5.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_5.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《法证先锋3》[至26集]写字楼惊现“女僵尸”尸体！"
            }
        },
        {
            "small": {
                "src": "images/ico_6.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_6.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《非常了得》孟非郭德纲大曝台下私生活，内地Hold姐来挑战"
            }
        },
        {
            "small": {
                "src": "images/ico_7.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_7.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "第二届九分钟电影11月20日独家首映 视觉盛宴恭迎各位看官"
            }
        },
        {
            "small": {
                "src": "images/ico_8.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_8.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《快女微电影》 洪辰脸伤痊愈 快女微电影收官作复拍"
            }
        },
        {
            "small": {
                "src": "images/ico_9.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_9.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《称心如意》京城第一“育婴男”Hold住全场 萝莉热舞走光"
            }
        },
        {
            "small": {
                "src": "images/ico_10.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_10.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《男人帮》[全30集]悲喜双响炮，一个完美结局"
            }
        },
        {
            "small": {
                "src": "images/ico_11.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_11.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《辛亥革命》成龙、赵文瑄、李冰冰、胡歌演绎革命腥风血雨"
            }
        },
        {
            "small": {
                "src": "images/ico_12.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_12.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "《李献计历险记》房祖名患差时症为寻女友开启超时空冒险"
            }
        },
        {
            "small": {
                "src": "images/ico_13.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_13.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "Justin bieber女友动感热单全球首发。"
            }
        },
        {
            "small": {
                "src": "images/ico_14.jpg",
                "alt": "QQ幻灯片"
            },
            "big": {
                "src": "images/pic_14.jpg",
                "alt": "QQ幻灯片",
                "href": "www.baidu.com",
                "title": "第八届中国（重庆）国际园林博览会"
            }
        }
    ];
    var slides_len = slides.length;

    // 小图展现区域ul
    var mask_images = document.getElementById("mask_images");

    // 展示幻灯片区域
    var fragment = document.createDocumentFragment();

    // 添加幻灯片数据到展示幻灯片区域
    slides.forEach(function (slide, index) {
        var li = document.createElement("li");
        li.index = index;
        var img = document.createElement("img");
        img.src = slide.small.src;
        img.alt = slide.small.alt;
        li.appendChild(img);
        fragment.appendChild(li);

        img = null;
        li = null;
    });

    mask_images.appendChild(fragment);

    fragment = null;

    // 获取所有的小图li
    var slides_lis = mask_images.getElementsByTagName("li");
    // 获取第一个li
    var first_li = slides_lis[0];

    // 左右方向键滚动幻灯片
    var direction_left = document.querySelector("#slide > #slide_mask > #mask_bottom > #mask_direction > span.direction_left");
    var direction_right = document.querySelector("#slide > #slide_mask > #mask_bottom > #mask_direction > span.direction_right");
    // 方向键激活类名
    var direction_active = "direction_active";
    // li实际占据的宽度
    var li_width = parseInt(getStyle(first_li, "width"));
    // ul实际总占宽度
    var mask_images_width = slides_len * li_width;
    mask_images.style.width = mask_images_width + "px";

    // 默认第一个小图被选中
    activeSlide(first_li, 0);

    // 监听每个小图的点击事件
    for (var i = 0; i < slides_len; i++) {
        // 防止闭包
        (function (index) {
            slides_lis[index].addEventListener("click", function () {
                activeSlide(this, index)
            }, false);
        })(i);
    }

    slides_lis = null;

    // 激活点击的幻灯片
    function activeSlide(li, index) {

        // 避免重复点击自身
        if (li.style.opacity && li.style.opacity === "1") {
            return;
        }

        // 大图信息
        var bigSlide = slides[index].big;

        // 大图链接
        var slide_maxImage = document.querySelector("#slide_maxImage");
        slide_maxImage.href = bigSlide.href;
        slide_maxImage.title = bigSlide.title;

        // 大图图片
        var slide_img = slide_maxImage.getElementsByTagName("img")[0];
        slide_img.src = bigSlide.src;
        slide_img.alt = bigSlide.alt;

        // 大图标题
        var slide_title = document.querySelector("#mask_top > a");
        slide_title.href = bigSlide.href;
        slide_title.title = bigSlide.title;
        slide_title.querySelector("span.title").innerHTML = bigSlide.title;

        // 去掉之前已选中的图片
        var activeLiIndex = mask_images.getAttribute("activeLiIndex");
        if (activeLiIndex !== null) {
            var prev_li = mask_images.getElementsByTagName("li")[activeLiIndex];
            prev_li.style.opacity = ".3";
            prev_li.removeChild(prev_li.getElementsByClassName("slide_active")[0]);
            prev_li.removeChild(prev_li.getElementsByClassName("triangle_top")[0]);
            prev_li = null;
        }

        // 选中样式
        li.style.opacity = "1";
        var div = document.createElement("div");
        var span = document.createElement("span");
        li.appendChild(div);
        li.appendChild(span);
        div.className = "slide_active";
        span.style.position = "absolute";
        span.className = "triangle_top";

        // 把当前被选中的li索引设置到ul标签的顺序中
        mask_images.setAttribute("activeLiIndex", index);

        // 点击除了第一张小图外的其它小图，激活左方向按键
        if (index !== 0 && hasClass(direction_left, direction_active) === false) {
            addClass(direction_left, direction_active);
        }
        else if (index === 0) {
            removeClass(direction_left, direction_active)
        }

        // 点击除了最后一张小图外的其它小图，激活右方向按键
        if (index !== slides_len - 1 && hasClass(direction_right, direction_active) === false) {
            addClass(direction_right, direction_active);
        }
        else if (index === slides_len - 1) {
            removeClass(direction_right, direction_active)
        }

        span = null;
        div = null;
        slide_title = null;
        slide_img = null;
        slide_maxImage = null;
        bigSlide = null;
    }

    // 设置左右滚动的次数,默认为1次，即未滚动
    mask_images.setAttribute("moveCounter", "1");

    // 点击方向键实现小图区域移动功能
    direction_left.onclick = direction_right.onclick = function (e) {
        directionFun(this, e);
    };

    // 方向键功能
    function directionFun(obj, e) {
        // 没有被激活不能进行下一步操作
        if (hasClass(obj, direction_active) === false) {
            return;
        }

        // 阻止事件冒泡和默认事件
        e = e || event;
        e.stopPropagation();
        e.preventDefault();

        // 移动次数
        var moveCounter = parseInt(mask_images.getAttribute("moveCounter"));
        // 移动方向
        var direction = obj === direction_right ? -1 : 1;
        // 移动距离
        var move_distance = parseInt(getStyle(mask_images, "left")) + direction * li_width;
        mask_images.style.left = move_distance + "px";
        mask_images.style.transition = "all .7s ease-in";

        // 向右移动
        if (obj === direction_right) {
            moveCounter++;
            // 如何判断右移到最后一个可展示的图片？
            // 方式一：所有图片占据的总距离 - 已经左移的距离(为负数，所以下面使用+号) = 当前可展示区域的宽度
            // 方式二：所有图片个数 - 已经左移的次数 = 7
            if (mask_images_width + move_distance === parseInt(getStyle(document.getElementById("slide_minImage"), "width"))) {
                // 去掉右方向的激活状态类
                removeClass(obj, direction_active);
            }

            // 如果左方向没有激活，则添加激活类
            if (hasClass(direction_left, direction_active) === false) {
                addClass(direction_left, direction_active);
            }
        }
        else {
            // 向左移动
            moveCounter--;

            // 左移到第一个，去掉左方向的激活状态类
            if (moveCounter === 1) {
                removeClass(obj, direction_active);
            }

            // 如果右方向没有激活，则添加激活类
            if (hasClass(direction_right, direction_active) === false) {
                addClass(direction_right, direction_active);
            }
        }

        // 设置移动次数
        mask_images.setAttribute("moveCounter", moveCounter + "");
    }

    // 获取当前元素的样式
    function getStyle(obj, style) {
        return obj.currentStyle ? obj.currentStyle[style] : document.defaultView.getComputedStyle(obj, null)[style];
    }

    // 判断当前元素是否有类
    function hasClass(obj, className) {
        return obj.className && obj.className.indexOf(className) !== -1;
    }

    // 添加类名
    function addClass(obj, className) {
        if (hasClass(obj, className) === false) {
            obj.className += " " + className + " ";
        }
    }

    // 删除类名
    function removeClass(obj, className) {
        if (hasClass(obj, className) === true) {
            obj.className = obj.className.replace(className, "");
        }
    }
};
