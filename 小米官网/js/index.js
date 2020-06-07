/*导航二级菜单 S*/
$(".site-header .header-nav ul li").hover(function(){
	$(this).find(".navmenu").show();
},function(){
	$(this).find(".navmenu").hide();
});
/*导航二级菜单 S*/

/*点击搜索框显示搜索选项 S*/
$(".site-header .header-search input.search-text").click(function(e){
	$(this).css("border-color","#ff6670");
	$(".site-header .header-search").css("border-color","#ff6670");
	$(".site-header .header-search a.wristband").css("display","none");
	$(".site-header .header-search a.phone").css("display","none");
	$(".site-header .header-search .search-select").css("display","block");
	e.stopPropagation();
});
//点击其它地方还原搜索框之前的状态
$(document).click(function(){
	$(".site-header .header-search input.search-text").css("border-color","#e0e0e0");
	$(".site-header .header-search").css("border-color","#e0e0e0");
	$(".site-header .header-search a.wristband").css("display","block");
	$(".site-header .header-search a.phone").css("display","block");
	$(".site-header .header-search .search-select").fadeOut(500);
});
/*点击搜索框显示搜索选项 E*/

/*图片轮播 S*/
var _index = 0;
var cleartime = null;
$(".carousel ul.dot li").hover(function(){
	_index =  $(this).index();
	clearInterval(cleartime);
	common();
},function(){
	autoplay();
});			
//设置构造方法
function common(){
	$(".carousel ul.dot li").eq(_index).addClass("click").siblings().removeClass("click");
	$(".carousel ul.img li").eq(_index).fadeIn(1000).siblings().fadeOut(300);
};
//设置定时器
function autoplay(){
	cleartime=setInterval(function(){	
		_index++;			
		if (_index>4)
		{
			_index=0;						
		}
		common();
	},3000);
};
autoplay();
/*图片轮播 E*/

/*小米明星单品 点击左右键切换图片 S*/
cleartime1 = null;
$(".star .star-top .btn span.left").click(function(){
	clearInterval(cleartime1);
	$(this).css("color","#b0b0b0");
	$(".star .star-top .btn span.right").css("color","#e0e0e0");
	$(".star .star-bottom ul").css("transition","1s");
	$(".star .star-bottom ul").css("margin-left","0px");
});
$(".star .star-top .btn span.right").click(function(){
	clearInterval(cleartime1);
	$(this).css("color","#b0b0b0");
	$(".star .star-top .btn span.left").css("color","#e0e0e0");
	$(".star .star-bottom ul").css("transition","1s");
	$(".star .star-bottom ul").css("margin-left","-1226px");
});

function autoplay1(){
	cleartime1=setInterval(function(){
		
	},9000);
}
/*小米明星单品 点击左右键切换图片 E*/
