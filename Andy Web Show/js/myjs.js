/*换肤 S*/

//点击图片显示皮肤列表框
$(".head img.logo").hover(function(e){
		$(this).css("transform","scale(1.2,1.2)");
		$(".top").css("display","block");
	//	$(".top #skin").slideToggle("slow");
		$(".top .skin").fadeIn(1000);
	//	$("#skin").slideDown(); //向下展开	
		$(".top .skin").click(function(e){
			e.stopPropagation(); //阻止事件向上冒泡时间
		});
	},function(e){		
	e.stopPropagation();
});		

//点击其它地区收缩皮肤框
$(document).click(function(){
	$(".top .skin").fadeOut(1000); //淡出
	//	$(".top #skin").slideUp(); //向上收缩
	//	$(".top #skin").hide(); //隐藏
	$(".top").css("display","none");
	$(".head img.logo").css("transform","scale(1,1)");
});

//鼠标移动到该皮肤上，设置为背景
$(".skin .scroll .imgList ul li").hover(function(){
	var bimg = $(this).find("img").attr("dataSrc");//获取大图地址路径 attr 属性
	$("body").css("background","url("+bimg+") no-repeat");//给body赋值更换背景图片
	$("body").css("background-size","cover");
});

//点击左按钮，切换效果
var numClick = 0;
$(".top .skin img.prev").click(function(){
	numClick++;
	if(numClick==3){alert("别闹 --> 到头了");numClick=2;}
	$(".imgList").animate({left:-844*numClick},1000);
});

//点击右按钮，切换效果
$(".top .skin img.next").click(function(){
	numClick--;
	if(numClick==-1){alert("别闹 --> 到头了");numClick=0;}
	$(".imgList").animate({left:-844*numClick},1000);
});

/*换肤 E*/

/*点击h1标签下的span标签显示播放器 S*/
$(".head span").click(function(){
	$("#audio").fadeIn(2000);
	$("#audio").css("display","inline-block");
});
/*点击h1标签下的span标签显示播放器 E*/

/*吸顶盒特效 S*/
$(window).scroll(function(){
		var _top = $(window).scrollTop();//获取滚动条距离上边的距离
	//	alert(_top);
		if (_top>100)
		{
			$(".bg").addClass("Top");
			$(".bg").css("background","rgba(0, 0, 0, 0.2)");
		}else{
			$(".bg").removeClass("Top");
		}
});
/*吸顶盒特效 E*/

/*点击搜索按钮显示搜索框等特效 S*/
$(".bg .nav .search img").click(function(e){
	$(this).css("border-radius","12px 0px 0px 12px");
	$(this).css("transition","1s");
	$(".bg .nav .search input").fadeIn(1300);
	$(".bg .nav .search input").css({width:160,right:18});
	$(".bg .nav .search input").css("border-radius","0px 12px 12px 0px");
	$(".head #audio").fadeOut(2000);
	e.stopPropagation();
	/*点击搜索框时添加样式*/
	$(".bg .nav .search input").click(function(e){
		$(".bg .nav .search input").css({width:170,right:8});
		$(".bg .nav .search input").css("text-indent","20px");
		e.stopPropagation();
	});
	$(document).click(function(){
		$(".bg .nav .search input").fadeOut(1000);
		$(".bg .nav .search input").css({width:160,right:30});
		$(".bg .nav .search input").css("text-indent","10px");
		$(".bg .nav .search img").css("border-radius","12px");
	});
});			
/*点击搜索按钮显示搜索框等特效 E*/

/*导航二级菜单的实现 S*/
$(".bg .nav ul li").hover(function(){
	$(this).find(".menu").show();//显示 .menu 盒子
	},function(){
	$(this).find(".menu").hide();//隐藏
});
/*导航二级菜单的实现 E*/


/*第一部分内容图片轮播开始*/
var _index = 0;
var clearTime = null;
$(".banner .curr ul li").hover(function(){
	clearInterval(clearTime);
	_index = $(this).index();
	common();
	},function(){
	autoPlay();
});
function autoPlay(){
	clearTime=setInterval(function(){
		_index++;
		if (_index>6)
		{
			_index=0;
		}	
		common();
	},5000);
}
function common(){
	$(".banner .curr ul li").eq(_index).find(".p1").show().parent().siblings().find(".p1").hide();
	$(".banner .curr ul li").eq(_index).find(".p2").hide().parent().siblings().find(".p2").show();
	$(".banner .con .img").eq(_index).fadeIn(1000).siblings().fadeOut();
}
autoPlay();
/*第一部分内容图片轮播结束*/

/*第二部分内容区广告轮播效果 S*/
var _index2 = 0;
var timeInterval = null;
$("ul.Part_ScrollBut li").hover(function(){
	clearInterval(timeInterval);//清除定时器
	_index2 = $(this).index();
	same();
	},function(){
	autoPlay2();
});

//构造自动轮播方法
function autoPlay2(){
	//制作定时器
	timeInterval=setInterval(function(){
			if (_index2<=4)
			{
				if (_index2==4){_index2 = -1;}
				_index2++;
				same();
			}
		},1000);	
};
//构造函数方法(取相同属性)
function same(){
	$("ul.Part_ScrollBut li").eq(_index2).addClass("hover").siblings().removeClass("hover");
	$(".Part_ScrollCon").animate({left:"-"+_index2*339+"px"},1000);
	$("ul.Part_ScrollTxt li").eq(_index2).show().siblings().hide();
} 
autoPlay2();
/*第二部分内容区广告轮播效果 E*/

//路线推荐选项卡效果
/*鼠标滑上去的效果 S*/ 
$("ul.select_but li").mouseover(function(){
	$(this).addClass("hover").siblings().removeClass("hover");//改变选项卡样式
	$(".select_con .select_content").eq($(this).index()).show().siblings().hide();//改变内容区
});
/*鼠标滑上去的效果 E*/ 

/*图片文字滑动效果 S*/
$("ul.sel_imgList li").hover(function(){
		$(this).find("p").stop().animate({height:"60px"},200)
	},function(){
		$(this).find("p").stop().animate({height:"0px"},200)
});
/*图片文字滑动效果 E*/

/*发表说说 S*/
$(".but img.imgface").click(function(e){
	$(".face").slideDown(); //慢慢乡下展开 event事件
	e.stopPropagation(); //阻止冒泡时间
});
$(document).click(function(){
	$(".face").slideUp(); //向上收缩
});	

//点击表情，添加到div.edit
$(".face ul li").click(function(){
	var img = $(this).find("img").clone();
	$(".edit_text").append(img);
});
$(".but .msg_but").click(function(){
	var txt = $(".edit_text").html(); //html 得到表情 会转换
	if (txt=="")
	{
		$(".edit_text").focus(); //获取焦点
	} 
	else{
		$(".msgBox").append("<div class='msgInfo'><dl><dt><img src='images/psb.png' alt='logo' width='50' height='50' /></dt><dd>Tell Andy Show</dd></dl><p>发表内容为：</p><div class='con'>"+txt+"</div></div>");
		$(".edit_text").html("");
	}
});
$(".but .msg_reset").click(function(){
	$(".edit_text").html("");
});
/*发表说说 E*/

/* 
1.获取浏览器的 w  h  
2.获取 canvas对象
	a： 给 画布动态添加高度 宽度
3.获取上下文
4. 定义方法
	a:绘画矩形fillRect(x,y,w,h);
	b:给画布添加文字 fillText(文字,x,y);
	? 下落是通过那个坐标实现的    改变y的坐标 
		a：是一组数据  用数组装 定义一个数组变量drops =[];初始逗为0
		b :  有多少列   浏览器的宽度/ 字体的大小= 列  var cols = 0；
	c： 动态添加文字的坐标   需要参数
			x  =  i* fontSize
			y  =  drops[i]* fontSize
			fillText(文字,x,y);
			drops[i] ++ 
	d: 定时器     
			setInterval
	f:  判断  y>= canvas.height   && Math.random() >0.99
		a: 重置  y的坐标
*/

/*JS+HTML5模仿骇客帝国文字矩阵效果 S*/
window.onload = function(){
	//可视的范围
	var s =window.screen;
	//屏幕宽
	var w =s.width; 
	//屏幕高
	var h =s.height;
	//获取对象
	var canvas =document.getElementById("canvas1");
	//获取上下文
	var ctx = canvas.getContext("2d");
	canvas.width = w;
	canvas.height = h;
	var str = "⑯⑮⒃ǔㄈㄆㄖΗΡζ";//字体显示
	var fontSize = 12;
	console.log(fontSize);
	//动态计算整个屏幕能够铺开多少列
	var cols = Math.floor(w/fontSize);
	//这是一个数组 存放所有Y的坐标
	var drops =[];
	//初始化左右的y坐标都为0
	for (var i = 0; i<cols ; i++ )
	{
		drops.push(0);
	}
	//绘画的方法
	function draw(){
		//通过透明色 实现渐变
		ctx.fillStyle = "rgba(0,0,0,0.05)";
		//填充整个页面
		ctx.fillRect(0,0,w,h);
		ctx.fillStyle = ranColor();
		//字体的 粗细 大小 风格
		ctx.font="600 "+fontSize+"px 微软雅黑";
		//遍历定义坐标的位置
		for (var i = 0; i<cols ;i++ )
		{
			//随机文字
			var index = Math.floor(Math.random()*str.length);
			//定义x y 坐标
			var x = i*fontSize;
			var y = drops[i]*fontSize;
			//拿到坐标后绘画文字
			ctx.fillText(str[index],x,y);
			//这里是难点 
			if (y >= canvas.height && Math.random()>0.99)
			{
				//满足条件y为0  重新跑
				drops[i]=0;
			}
			//循坏一次 y 改变一次位置 也就是向下
			drops[i]++;
		}
	};
	draw();
	setInterval(draw,33);
	//随机颜色
	function ranColor()
	{
		var r=Math.floor(Math.random()*256);
		var g=Math.floor(Math.random()*256);
		var b=Math.floor(Math.random()*256);
		return "rgb("+r+","+g+","+b+")";
	};
};
/*JS+HTML5模仿骇客帝国文字矩阵效果 E*/

/*矩阵旋转 S*/
function transform1(){
	var red = document.getElementsByClassName("rect-red")[0];
	var blue = document.getElementsByClassName("rect-blue")[0];
	var yellow = document.getElementsByClassName("rect-yellow")[0];
	var pink = document.getElementsByClassName("rect-pink")[0];
	var gray = document.getElementsByClassName("rect-gray")[0];
	var green = document.getElementsByClassName("rect-green")[0];
	red.style.webkitTransform = "rotateX(90deg) translateZ(400px)";
	blue.style.webkitTransform = "rotateX(270deg) translateZ(400px)";
	yellow.style.webkitTransform = "rotateY(90deg) translateZ(400px)";
	pink.style.webkitTransform = "translateZ(400px)";
	gray.style.webkitTransform = "translateZ(-400px)";
	green.style.webkitTransform = "rotateY(270deg) translateZ(400px)";
	setTimeout('testCallback(a)',2000);
	red.style.backgroundColor = "red";
	blue.style.backgroundColor = "blue";
	yellow.style.backgroundColor = "yellow";
	pink.style.backgroundColor = "pink";
	gray.style.backgroundColor = "gray";
	green.style.backgroundColor = "green";
}

function a(){
		var red = document.getElementsByClassName("rect-red")[0];
		var blue = document.getElementsByClassName("rect-blue")[0];
		var yellow = document.getElementsByClassName("rect-yellow")[0];
		var pink = document.getElementsByClassName("rect-pink")[0];
		var gray = document.getElementsByClassName("rect-gray")[0];
		var green = document.getElementsByClassName("rect-green")[0];
		red.style.webkitTransform = "";
		blue.style.webkitTransform = "";
		yellow.style.webkitTransform = "";
		pink.style.webkitTransform = "";
		gray.style.webkitTransform = "";
		green.style.webkitTransform = "";
		red.style.webkitTransition = "1s ease";
		blue.style.webkitTransition = "1s ease";
		yellow.style.webkitTransition = "1s ease";
		pink.style.webkitTransition = "1s ease";
		gray.style.webkitTransition = "1s ease";
		green.style.webkitTransition = "1s ease";
		red.className = "rect-reds";
		blue.className = "rect-blues";
		yellow.className = "rect-yellows";
		pink.className = "rect-pinks";
		gray.className = "rect-grays";
		green.className = "rect-greens";
}

function testCallback(callback) {
	callback();
}

function transform2() {
		var red = document.getElementsByClassName("rect-reds")[0];
		var blue = document.getElementsByClassName("rect-blues")[0];
		var yellow = document.getElementsByClassName("rect-yellows")[0];
		var pink = document.getElementsByClassName("rect-pinks")[0];
		var gray = document.getElementsByClassName("rect-grays")[0];
		var green = document.getElementsByClassName("rect-greens")[0];
		red.style.webkitTransition = "1s ease";
		blue.style.webkitTransition = "1s ease";
		yellow.style.webkitTransition = "1s ease";
		pink.style.webkitTransition = "1s ease";
		gray.style.webkitTransition = "1s ease";
		green.style.webkitTransition = "1s ease";
		red.style.webkitTransform = "rotateX(0) translateZ(600px)";
		blue.style.webkitTransform = "rotateX(0) translateZ(400px)";
		yellow.style.webkitTransform = "rotateY(0) translateZ(200px)";
		pink.style.webkitTransform = "translateZ(0px)";
		gray.style.webkitTransform = "translateZ(-200px)";
		green.style.webkitTransform = "rotateY(0) translateZ(-400px)";
		red.style.backgroundColor = "pink";
		blue.style.backgroundColor = "pink";
		yellow.style.backgroundColor = "pink";
		pink.style.backgroundColor = "pink";
		gray.style.backgroundColor = "pink";
		green.style.backgroundColor = "pink";
		setTimeout('testCallback(b)',2000);
}

function b(){
		var red = document.getElementsByClassName("rect-reds")[0];
		var blue = document.getElementsByClassName("rect-blues")[0];
		var yellow = document.getElementsByClassName("rect-yellows")[0];
		var pink = document.getElementsByClassName("rect-pinks")[0];
		var gray = document.getElementsByClassName("rect-grays")[0];
		var green = document.getElementsByClassName("rect-greens")[0];
		red.style.webkitTransform = "";
		blue.style.webkitTransform = "";
		yellow.style.webkitTransform = "";
		pink.style.webkitTransform = "";
		gray.style.webkitTransform = "";
		green.style.webkitTransform = "";
		red.style.webkitTransition = "1s ease";
		blue.style.webkitTransition = "1s ease";
		yellow.style.webkitTransition = "1s ease";
		pink.style.webkitTransition = "1s ease";
		gray.style.webkitTransition = "1s ease";
		green.style.webkitTransition = "1s ease";
		red.className = "rect-red";
		blue.className = "rect-blue";
		yellow.className = "rect-yellow";
		pink.className = "rect-pink";
		gray.className = "rect-gray";
		green.className = "rect-green";
}
/*矩阵旋转 E*/