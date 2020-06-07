let data = [
	{
		title: "态度",
		src: "./images/0.jpg"
	},
	{
		title: "最前沿",
		src: "./images/1.jpg"
	},
	{
		title: "最话题",
		src: "./images/2.jpg"
	},
	{
		title: "事件",
		src: "./images/3.jpg"
	},
	{
		title: "推荐",
		src: "./images/4.jpg"
	},
	{
		title: "尚惠",
		src: "./images/5.jpg"
	},
];

$(function() {
	$("#wrap").jqueryStairs({
		data: data
	}).on("beforeHover", function(e, msg) {
		console.log("beforeHover");
		console.log("msg", msg);
	}).on("AfterHover", function(e, msg) {
		console.log("AfterHover");
		console.log("msg", msg);
	}).on("beforeLeave", function(e, msg) {
		console.log("beforeLeave");
		console.log("msg", msg);
	}).on("AfterLeave", function(e, msg) {
		console.log("AfterLeave");
		console.log("msg", msg);
	});
})