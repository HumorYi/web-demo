function uploadImg(obj){//自定义一个功能函数 obj形参
	if (!obj.value.match(/.jpg|.gif|.png|.bmp/i))
	{
		alert("请选择图片文件！");
	}else{
		//通过id名获取到fileName这个元素
		var fileName = document.getElementById("fileName");				
		//obj.files[0].name;获取到上传进来的文件的名字
		//files[0] 数组保存文件 files[0] 获取数组里面的第一个文件
		//将文件的名字赋值给fileName
		fileName.value = obj.files[0].name;
		//通过id名img获取到img这个元素
		var img = document.getElementById("img");
		//把获取到文件路径给img标签的src属性
		//window下面的URL下面的createObjectURL方法来获取文件路径
		img.src = window.URL.createObjectURL(obj.files[0]);
		
		//通过插件来实现图片放大功能
		img.setAttribute("bigsrc",img.src);
}

}