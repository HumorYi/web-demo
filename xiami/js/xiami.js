window.onload = function(){
	$(".nav .wrapper .w_right a:nth-child(1)").hover(function(){
		$(".nav .wrapper .w_right a:nth-child(1) b").css("background","url(img/header_icon.png) no-repeat -72px -72px");
	},function(){
		$(".nav .wrapper .w_right a:nth-child(1) b").css("background","url(img/header_icon.png) no-repeat -72px -48px");
	});

	$(".nav .wrapper .w_right a:nth-child(2)").hover(function(){
		$(".nav .wrapper .w_right a:nth-child(2) b").css("background","url(img/header_icon.png) no-repeat -24px -72px");
	},function(){
		$(".nav .wrapper .w_right a:nth-child(2) b").css("background","url(img/header_icon.png) no-repeat -24px -48px");
	});

	$(".nav .wrapper .w_right a:nth-child(3)").hover(function(){
		$(".nav .wrapper .w_right a:nth-child(3) b").css("background","url(img/header_icon.png) no-repeat -48px -72px");
	},function(){
		$(".nav .wrapper .w_right a:nth-child(3) b").css("background","url(img/header_icon.png) no-repeat -48px -48px");
	});

	$(".nav .wrapper .w_left a").click(function(){
		$(this).addClass("nav_color").siblings().removeClass("nav_color");
	});
}
