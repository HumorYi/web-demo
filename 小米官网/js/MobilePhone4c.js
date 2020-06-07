/*图片轮播 S*/
var _index = $(".Carousel ul li").index();
function autoPlay(){
	setInterval(function(){
		$(".Carousel ul li").eq(_index).fadeIn(2000).siblings().fadeOut(2000);
		_index++;
		if (_index>2)
		{
			_index=0;
		}	
	},5000);
}
autoPlay();
/*图片轮播 E*/
