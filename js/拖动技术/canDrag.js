function canDrag(dragger){
	/*为需要拖动的元素增加onmousedown事件监听*/
	var drag = bindEvent(dragger, 'onmousedown', function(e){
		//兼容事件对象
		e = e || event;

		//兼容坐标属性
		var pageX = e.clientX || e.pageX;
		var pageY = e.clientY || e.pageY;

		//兼容样式对象
		var style = dragger.currentStyle || window.getComputedStyle(dragger, null);

		//获取元素坐标  当没有设置left和top属性时，IE默认为auto
		var offX = parseInt(style.left) || 0;
		var offY = parseInt(style.top) || 0;

		//获取鼠标相对于元素的间距
		var offXL = pageX - offX;
		var offYL = pageY - offY;

		//为dragger增加onDrag属性，用来存储拖动事件
		if(!dragger.onDrag){
			//监听拖动事件
			dragger.onDrag = bindEvent(document, 'onmousemove', function(e){
				e = e || event;
				//设置X坐标
				dragger.style.left = (e.clientX || e.pageX) - offXL + 'px';
				//设置Y坐标
				dragger.style.top = (e.clientY || e.pageY)- offYL + 'px';
			});

			//监听拖动结束事件
			dragger.onDragEnd = bindEvent(document, 'onmouseup', function(){
				//释放拖动监听和结束监听
				removeEvent(document, 'onmousemove', dragger.onDrag);
				removeEvent(document, 'onmouseup', dragger.onDragEnd);
				try{
					//删除拖动时所用的属性，兼容FF使用
					delete dragger.onDrag;
					delete dragger.onDragEnd;
				}catch(e){
					//删除拖动时所用的属性，兼容IE6使用
					dragger.removeAttribute('onDrag');
					dragger.removeAttribute('onDragEnd');
				}
			});
		}
	});

	return function(){
		//10秒钟后，拖动能力被去除
		setTimeout(function(){
			alert('拖动效果消失');
			//释放拖动监听和结束监听
			removeEvent(document, 'onmousemove', dragger.onDrag);
			removeEvent(document, 'onmouseup', dragger.onDragEnd);
			try{
				//删除拖动时所用的属性，兼容FF使用
				delete dragger.onDrag;
				delete dragger.onDragEnd;
			}catch(e){
				//删除拖动时所用的属性，兼容IE6使用
				dragger.removeAttribute('onDrag');
				dragger.removeAttribute('onDragEnd');
			}
		},10000);
	}
}