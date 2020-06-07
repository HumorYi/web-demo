$(function(){
	setTimeout(function(){
		$(document).scrollTop(0)
	},50);
	var index=0;
	var time = new Date();
	var winh = $(window).height();
	$(".header .nav ul li").mouseenter(function(){//鼠标移动上去
		$(this).addClass("on").siblings().removeClass("on");
	//	alert($(this).position().left);
		$(".header .nav .bor").stop(true).animate({
			left:$(this).position().left+38+"px",
			width:$(this).width()+28+"px"
		},1);
	//	alert($(this).width());
	});
	$(".header .nav").mouseleave(function(){//鼠标移开
		$(".header .nav ul li").eq(0).addClass("on").siblings().removeClass("on");
		$(".header .nav .bor").animate({
			left:"38px",
			width:"56px"
		},0.4);
	});
	$(".slide ul li").click(function(){
		$(this).addClass("in").siblings().removeClass("in");
		index = $(this).index();
		$(document.body).animate({"scrollTop":index*winh+"px"},1000);
	});
	$(document).mousewheel(function(){
		if ( new Date()-time>800)
		{
			time = new Date();
			var dwheel = arguments[1];
			if (dwheel<0)
			{
				index++;
				index%=4;
			}else{
				index--;
				if (index<0){index=3;}
			}
			$(".slide ul li").eq(index).addClass("in").siblings().removeClass("in");
			$(document.body).animate({"scrollTop":index*winh+"px"},1000);
		}
	});
});