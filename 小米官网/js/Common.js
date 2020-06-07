/*导航二级菜单 S*/
$(".site-header .header-nav ul li").hover(function(){
	$(this).find(".navmenu").show();
},function(){
	$(this).find(".navmenu").hide();
});
/*导航二级菜单 S*/

/*点击搜索框显示搜索选项 S*/
$(".site-header .header-search input.search-text").click(function(e){
	$(this).css("border-color","#ff6670");
	$(".site-header .header-search").css("border-color","#ff6670");
	$(".site-header .header-search a.wristband").css("display","none");
	$(".site-header .header-search a.phone").css("display","none");
	$(".site-header .header-search .search-select").css("display","block");
	e.stopPropagation();
});
//点击其它地方还原搜索框之前的状态
$(document).click(function(){
	$(".site-header .header-search input.search-text").css("border-color","#e0e0e0");
	$(".site-header .header-search").css("border-color","#e0e0e0");
	$(".site-header .header-search a.wristband").css("display","block");
	$(".site-header .header-search a.phone").css("display","block");
	$(".site-header .header-search .search-select").fadeOut(500);
});
/*点击搜索框显示搜索选项 E*/

/*鼠标移动到“全部商品分类”上面显示二级菜单 S */
$(".nav-allproduct").hover(function(){
	$(".all-nav").css("display","block");
},function(){
	$(".all-nav").css("display","none");
});
/*鼠标移动到“全部商品分类”上面显示二级菜单 E */