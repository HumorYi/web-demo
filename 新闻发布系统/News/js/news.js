//图片轮播
var _index = 0;
var timer = null;
$('.c_t_left ul li').click(function(){
	_index = $(this).index();
	clearInterval(timer);
	roll();
});
timer = setInterval(function(){
	_index++;
	if(_index>5){
		_index = 0;
	}
	roll();
},3000);
function roll(){
	$('.c_t_left ul li').eq(_index).addClass('num').siblings().removeClass('num');
	$('.c_t_left div').eq(_index).addClass('show').siblings().removeClass('show');
}

//点击导航添加样式
$('.head .h_nav ul li').click(function(){
	$(this).addClass('Bigfont').siblings().removeClass('Bigfont');
});