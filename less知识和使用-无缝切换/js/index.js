/* 
 *	业务：
 *		1、图片是从右往左移动，下面的小圆圈也要跟着到对应的小圆圈上
 *				例如：图片默认显示是第一张，小圆圈激活的也是第一个，当图片从第一张移动到第二张时，
 * 							把之前已经激活的小圆圈类给去掉，给第二个（即当前图片索引对应的小圆圈索引）添加激活类
 *		2、点击往左滚动的按钮，图片从右往左移动，点击往右滚动的按钮，图片从左往右移动
 *		3、点击小圆圈时，对应的图片要显示出来
 *		4、自动轮播
*/

// 由于时间关系，这里功能并未写完整，有兴趣的同学可以根据我的思路来完善实现功能
$(function(){
	var $banner = $("#banner");

	var bannerHandel = {
		timer: null,
		left: 0,
		activeIndex: 0,
		activeDirection: "left",
		intevalTime: 1000,
		windowWidth: $(window).width,
		$images: $banner.find(">ul.images"),		
		init: function() {
			this.$images.css("left", - this.windowWidth * this.activeIndex).find(">li").eq(this.activeIndex).addClass("active");

			return this.autoplay();
		},
		move: function() {
			this.$images.css("left", - this.windowWidth * this.activeIndex).next().find(">li").removeClass("active").eq(this.activeIndex).addClass("active");

			return this;
		},
		autoplay: function() {
			this.timer = setInterval(function(e){
				this.move();
			}.bind(this), this.intevalTime);

			return this;
		},
		stopPlay: function() {
			this.timer = null;

			return this;
		}
	};
	// bannerHandel.size = bannerHandel.$images.find(">li").size() + 1;	

	bannerHandel.init();

	$banner.on("click", ">button", function(e){
		$(this).hasClass("left") ? bannerHandel.activeIndex++ : bannerHandel.activeIndex--;

		bannerHandel.stopPlay().move();
	});
});