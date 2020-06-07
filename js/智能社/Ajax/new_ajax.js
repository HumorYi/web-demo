function ajax(url, fnSucc, fnFaild){
	//1.创建Ajax对象
	//用没有定义的变量--报错
	//alert(a);
	//用没有定义的属性--undefined
	//alert(window.a);
	//兼容IE6
	if (window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveObject("Microsoft.XMLHTTP");
	}

	//alert(oAjax.readyState); //0

	//2.连接服务器
	//open(方法, 文件名, 异步传输);
	//?t= + new Date().getTime() 去掉缓存
	oAjax.open('GET', url, true);

	//3.发送请求
	oAjax.send();

	//4.接受返回值
	//类似事件
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){	//读取完成
			if (oAjax.status == 200) {	//成功
				fnSucc(oAjax.responseText);	//返回请求内容
			}else{
				if (fnFaild) {
					fnFaild(oAjax.status);	//返回状态
				}
			}

		} 
	}
}