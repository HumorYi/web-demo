$(function(){
	
	var feature_banner = {
		timer: null,
		selector: {
			$banner: $("#banner")
		},
		data: {
			banners: [
				{
					src: "./images/1.jpg",
					alt: "img"
				},
				{
					src: "./images/2.jpg",
					alt: "img"
				},
				{
					src: "./images/3.jpg",
					alt: "img"
				},
				{
					src: "./images/4.jpg",
					alt: "img"
				},
				{
					src: "./images/5.jpg",
					alt: "img"
				},
				{
					src: "./images/6.jpg",
					alt: "img"
				},
				{
					src: "./images/7.jpg",
					alt: "img"
				},
				{
					src: "./images/8.jpg",
					alt: "img"
				},
				{
					src: "./images/9.jpg",
					alt: "img"
				},
				{
					src: "./images/10.jpg",
					alt: "img"
				}
			]			
		},
		init: function() {
			var fragment = document.createDocumentFragment(),
					$li = $("<li><img></li>"),
					banners_lastIndex = this.data.banners.length - 1
			;
			
			this.data.banners.forEach(function(banner, index) {
				var clone_$li = $li.clone();
				clone_$li.find(">img").attr({
					src: banner.src,
					alt: banner.alt
				});
				
				switch(index) {
					case 0:
						clone_$li.addClass("first active");
						break;
					case 1:
						clone_$li.addClass("second");
						break;
					case banners_lastIndex:
						clone_$li.addClass("last");
						break;
					default:
						break;
				}
				
				fragment.appendChild(clone_$li[0]);
			});			
			
			// 初始化轮播图数据并把所有的li添加到选择器下
			this.selector.$banner_lis = this.selector.$banner.find(">ul").html(fragment).find(">li");
			
			// 启动dom事件
			this.domEvent();
			// 启动自动轮播
			this.autoPlay(true);
		},
		// 轮播功能
		move: function(drection) {
			var	n = 0,//循环添加的变量
				styles = [],
				zIndexs = [],
				$banner_lis = this.selector.$banner_lis,
				$banner_lis_lastIndex = $banner_lis.size() - 1
			;
			
			for(var i=0; i<=$banner_lis_lastIndex; i++) {
				var currLi = $banner_lis.eq(i);
				styles.push(currLi.css([
						"left",
						"top",
						"width",
						"height",
						"margin-left"
					])
				);
				zIndexs.push(currLi.css("zIndex"));
			}

			for(var i=0; i<=$banner_lis_lastIndex; i++) {
				if(drection === 'left') {
					if(i === 0) {						
						n = $banner_lis_lastIndex;
					}
					else {
						n = i-1;				
					}
				}
				else if (drection === 'right'){
					if(i === $banner_lis_lastIndex) {
						n = 0;
					}
					else {							
						n = i+1;
					}
				}
				
				var $currLi = $banner_lis.eq(i);
				if(!$currLi.is(":animated")) {
					$currLi.css("z-index",zIndexs[n])
									.animate(styles[n],300);
				}						
			}
			
			$banner_lis.removeClass("active").filter(function(index) {
				return $(this).css("zIndex") == 3;
			}).addClass("active");
		},
		// 自动轮播
		autoPlay:  function(flag, interval, direction) {
			flag = flag || false;
			interval = interval || 3000;
			direction = direction || "left";
			
			var _this = this;
			if (flag) {
				this.timer = setInterval(function(e){
					_this.move(direction);
				}, interval);
				
				return;
			}
			
			clearInterval(this.timer);
		},
		// dom事件
		domEvent:  function() {
			// 鼠标移动到轮播图上，显示左右箭头，清除自动轮播；
			// 鼠标移开到轮播图上，隐藏左右箭头，启动自动轮播；
			var _this = this;
			this.selector.$banner.hover(function(e) {
				_this.autoPlay();
				
				$(this).find(">img.left, >img.right").show()
								.click(function(e) {
									if($(e.target).hasClass("left")) {
										return _this.move("left");			
									}
									
									_this.move('right');;
								});
			}, function(e) {
				_this.autoPlay(true);
				
				$(this).find(">img.left, >img.right").hide();
			});
		}
	};
	
	feature_banner.init();
});