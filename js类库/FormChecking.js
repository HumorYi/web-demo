/*下面我们将用策略模式来重构表单校验的代码， 很显然第一步我们要把这些校验逻辑都封装
成策略对象：*/
var strategies = {
	isNonEmpty: function(value, errorMsg) { // 不为空
		if(value === '') {
			return errorMsg;
		}
	},
	minLength: function(value, length, errorMsg) { // 限制最小长度
		if(value.length < length) {
			return errorMsg;
			82 第5 章 策略模式
		}
	},
	isMobile: function(value, errorMsg) { // 手机号码格式
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
			return errorMsg;
		}
	}
};

/*接下来我们准备实现Validator 类。 Validator 类在这里作为Context， 负责接收用户的请求
并委托给strategy 对象。 在给出Validator 类的代码之前， 有必要提前了解用户是如何向Validator
类发送请求的， 这有助于我们知道如何去编写Validator 类的代码。 代码如下：*/
var validataFunc = function() {
	var validator = new Validator(); // 创建一个validator 对象
	/***************添加一些校验规则****************/
	validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
	validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6 位');
	validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');
	var errorMsg = validator.start(); // 获得校验结果
	return errorMsg; // 返回校验结果
}
var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function() {
	var errorMsg = validataFunc(); // 如果errorMsg 有确切的返回值，说明未通过校验
	if(errorMsg) {
		alert(errorMsg);
		return false; // 阻止表单提交
	}
};

/*从这段代码中可以看到， 我们先创建了一个validator 对象， 然后通过validator.add 方法，
往validator 对象中添加一些校验规则。 validator.add 方法接受3 个参数， 以下面这句代码说明：
validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6 位');
registerForm.password 为参与校验的input 输入框。 'minLength:6'
是一个以冒号隔开的字符串。 冒号前面的minLength 代表客户挑选的strategy
对象， 冒号后面的数字6 表示在校验过程中所必需的一些参数。 'minLength:6'
的意思就是
校验registerForm.password 这个文本输入框的value 最小长度为6。 如果这个字符串中不
包含冒号， 说明校验过程中不需要额外的参数信息， 比如 'isNonEmpty'。
第3 个参数是当校验未通过时返回的错误信息。
当我们往validator 对象里添加完一系列的校验规则之后， 会调用validator.start() 方法来
启动校验。 如果validator.start() 返回了一个确切的errorMsg 字符串当作返回值， 说明该次校验
没有通过， 此时需让registerForm.onsubmit 方法返回false 来阻止表单的提交。

最后是Validator 类的实现：*/

var Validator = function() {
	this.cache = []; // 保存校验规则
};
Validator.prototype.add = function(dom, rule, errorMsg) {
	var ary = rule.split(':'); // 把strategy 和参数分开
	this.cache.push(function() { // 把校验的步骤用空函数包装起来，并且放入cache
		var strategy = ary.shift(); // 用户挑选的strategy
		ary.unshift(dom.value); // 把input 的value 添加进参数列表
		ary.push(errorMsg); // 把errorMsg 添加进参数列表
		return strategies[strategy].apply(dom, ary);
	});
};
Validator.prototype.start = function() {
	for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
		var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
		if(msg) { // 如果有确切的返回值，说明校验没有通过
			return msg;
		}
	}
};
/*
使用策略模式重构代码之后， 我们仅仅通过“ 配置” 的方式就可以完成一个表单的校验，
这些校验规则也可以复用在程序的任何地方， 还能作为插件的形式， 方便地被移植到其他项
目中。
在修改某个校验规则的时候， 只需要编写或者改写少量的代码。 比如我们想将用户名输入框
的校验规则改成用户名不能少于4 个字符。 可以看到， 这时候的修改是毫不费力的。 代码如下：
validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
// 改成：
validator.add(registerForm.userName, 'minLength:10', '用户名长度不能小于10 位');*/