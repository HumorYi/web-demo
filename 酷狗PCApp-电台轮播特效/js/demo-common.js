$(function(){
	var $banner = $("#banner"),
			banners = [
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
			],
			fragment = document.createDocumentFragment(),
			$li = $("<li><img></li>")
	;
	
	banners.forEach(function(banner, index) {
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
			case banners.length - 1:
				clone_$li.addClass("last");
				break;
			default:
				break;
		}
		
		fragment.appendChild(clone_$li[0]);
	});				
					
	$banner.find(">ul").html(fragment);
	
	var	$lis = $banner.find(">ul >li"),
			len = $lis.length
	;
	
	// 轮播功能
	function move(mark) {
		var	n = 0,//循环添加的变量
			styles = [],
			zIndexs = []
		;
		
		for(var i=0; i<len; i++) {
			var currLi = $lis.eq(i);
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

		for(var i=0; i<len; i++) {
			if(mark === 'left') {
				if(i === 0) {						
					n = 9;
				}
				else {
					n = i-1;				
				}
			}
			else if (mark === 'right'){
				if(i === 9) {
					n = 0;
				}
				else {							
					n = i+1;
				}
			}
			
			var $currLi = $lis.eq(i);
			if(!$currLi.is(":animated")) {
				$currLi.css("z-index",zIndexs[n])
								.animate(styles[n],300);
			}						
		}
		
		$lis.removeClass("active").filter(function(index) {
			return $(this).css("zIndex") == 3;
		}).addClass("active");
	}
		
	var timer = null;
	
	// 自动开始轮播
	function autoPlay(flag ,interval) {
		flag = flag || false;
		interval = interval || 3000;
		console.log(timer);
		if (flag) {
			timer = setInterval(function(e){
				move("left");
			}, interval);
			
			return;
		}
		
		timer && clearInterval(timer);
	}
	
	// 启动轮播
	autoPlay(true);
	
	// 鼠标移动到轮播图上，显示左右箭头，清除自动轮播；
	// 鼠标移开到轮播图上，隐藏左右箭头，启动自动轮播；
	$banner.hover(function(e) {
		autoPlay(false);
		
		$(this).find(">img.left, >img.right").show()
						.click(function(e) {
							if($(e.target).hasClass("left")) {
								return move("left");			
							}
							
							move('right');;
						});
	}, function(e) {
		autoPlay(true);
		
		$(this).find(">img.left, >img.right").hide();
	});
});