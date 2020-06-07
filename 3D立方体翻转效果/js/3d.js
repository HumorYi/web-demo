			$(function(){
				play(200);
				//鼠标点击按钮时激活事件
				$("#banner ol li").click(function(){
					$(this).addClass('on').siblings().removeClass('on');  //为按钮添加背景颜色
					var index = $(this).index();  //获取序列号
					$('#banner ul li').css({
							'transform':'translateZ(-180px) rotateX('+index*90+'deg)'  //图片旋转
					});
				});
			});
			
			//构建一个函数
			function play(x){
				var uhtml = '';			//添加<li><div>
				var phtml = '';			//添加div背景定位
				var zhtml = '',z=0;		//设置层级关系
				var thtml = '';			//设置各个div旋转时间
				var lw = 800/x;			//设置宽度
				//循环添加
				for (var i=0;i<x ;i++ )
				{
					//判断当循环的次数超过自定义的li个数，默认层级为0
					if (i>=x/2)
					{
						z--;
						zhtml += '#banner ul li:nth-child('+(i+1)+'){ z-index:'+(z-1)+';}';  //自定义层级
					}
					uhtml += '<li><div></div><div></div><div></div><div></div></li>';  //为<ul></ul>添加标签
					phtml += '#banner ul li:nth-child('+(i+1)+') div{ background-position:'+(-i*lw)+'px;}'; //自定义<li><div>标签下的背景定位
					thtml += '#banner ul li:nth-child('+(i+1)+'){ transition:.7s '+.7*i/x+'s;}'; //自定义li旋转和延迟时间
				};
				$('#banner ul').append(uhtml);  //为ul添加uhtml
				$('#banner ul li').css('width',lw+'px');		//给每个ul li添加宽度
				$('#banner ul li div').css('width',lw+'px');  //给每个ul li div添加宽度
				$('#css').append(phtml+zhtml+thtml);	//把三个属性添加到css中
			};