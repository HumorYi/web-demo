	/**
		1、找到关闭按扭，然后对他使行鼠标点击事件，慢慢向上收缩
	**/
	$("#topAdv img.close").click(function(){

		$("#topAdv").slideUp();//慢慢向上收缩

	});

	//鼠标导航滑块跟随效果
	$("#Logo ul li").not(".first,.last").hover(function(){
		//移上去
		var _left=$(this).position().left; //li与 ul左边的距离
		var _width=$(this).width(); //获取 li宽度
		$("#Logo ul li.last").show().css("width",_width).stop().animate({left:_left},300);
	},function(){
		//移开
		$("#Logo ul li.last").hide();
		//$("#Logo ul li.last").css("width","78px").stop().animate({left:"190px"},300);
	});

	//吸顶盒导航效果
	$(window).scroll(function(){
		var _top=$(window).scrollTop();
		var _height=$("#TopMain").height();
		document.title=_height;
		if(_top>=_height){

			$("#Logo").addClass("gd");  //添加class="gd"
		}else{
			$("#Logo").removeClass("gd");
		}
	});
