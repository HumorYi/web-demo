// 由于数据量比较少，老是切换数据和图片，比较麻烦，性能差，放弃这个想法

$(function() {
	var variables = {
			selector: {
				wrap: $("#wrap"),
				wrapUl: $("#wrap>ul"),
				wrapImg: $("#wrap>img")
			},
			data: {
				// 轮播图数据
				banners: [
					{
						location: "front",
						src: "./images/1.jpg",
						alt: "img"
					},
					{
						location: "left",
						src: "./images/2.jpg",
						alt: "img"
					},
					{
						location: "behind",
						src: "./images/3.jpg",
						alt: "img"
					},
					{
						location: "none",
						src: "./images/4.jpg",
						alt: "img"
					},
					{
						location: "none",
						src: "./images/5.jpg",
						alt: "img"
					},
					{
						location: "none",
						src: "./images/6.jpg",
						alt: "img"
					},
					{
						location: "none",
						src: "./images/7.jpg",
						alt: "img"
					},
					{
						location: "none",
						src: "./images/8.jpg",
						alt: "img"
					},
					{
						location: "none",
						src: "./images/9.jpg",
						alt: "img"
					},
					{
						location: "right",
						src: "./images/10.jpg",
						alt: "img"
					}
				]
			},
			methods: {
				// 初始化轮播图
				init: function(origin, options) {
					var banners = origin.data.banners,
							banner_curr = "",
							$ul = origin.selector.wrapUl
					;
					
					if (options) {
						$ul.find(">li").removeClass("active").filter(function() {
							return $(this).css("zIndex") == 2;
						}).addClass("active");
					}
					else if (options === undefined && banners.length >= 4) {
						options = {
							"front-index": 0,
							"left-index": 1,
							"behind-index": 2,
							"right-index": banners.length - 1
						};
					}				
					
					Object.keys(options).forEach(function(key) {
						banner_curr = banners[options[key]];
						$ul.find(">li." + (key.split("-")[0]) + ">img")
							.attr({
								src: banner_curr.src,
								alt: banner_curr.alt
							});
					});				
					
					$ul.attr(options);
				},
				// 图片轮播切换，思路是通过改变数据来达到切换效果
				broadCast: function(origin) {				
					var $ul = origin.selector.wrapUl,
							ul_attrs = {
								"front-index": $ul.attr("front-index"),
								"left-index": $ul.attr("left-index"),
								"behind-index": $ul.attr("behind-index"),
								"right-index": $ul.attr("right-index")
							},
							$lis = $ul.find(">li"),
							lis_lastIndex = $lis.length - 1,
							banners = origin.data.banners,
							banners_lastIndex = banners.length - 1,
							direction = "",
							runCount = -1
					;
					
					origin.selector.wrapImg.on("click", function(e){
						var $this = $(this),					
								styles = [],
								zIndexs = []
						;
						
						$lis.each(function(index, li) {
							zIndexs.push($(li).css("zIndex"));
							styles.push($(li).css(["left", "width", "height"]));
						});
						
						if($this.hasClass("left")) {
							direction = "left";
						}
						else if($this.hasClass("right")) {
							direction = "right";
						}
						
						$lis.each(function(index, li){						
							if(direction === "left") {							
								if(index === lis_lastIndex) {
									index = 0;
								}
								else {
									index++;
								}
							}
							else if (direction === "right") {
								if(index === 0) {
									index = lis_lastIndex;
								}
								else {
									index--;
								}
							}		
							
							if(!$(li).is(":animated")) {
								$(li).css("zIndex", zIndexs[index]).animate(
									styles[index],
									500,
									function() {
										runCount++;
										if (runCount === lis_lastIndex) {
											runCount = -1;
											
											Object.keys(ul_attrs).forEach(function(key, index) {
												if(direction === "left") {
													if (ul_attrs[key] == banners_lastIndex) {
														ul_attrs[key] = 0;
													}
													else {
														ul_attrs[key]++;		
													}
												}
												else if (direction === "right") {
													if (ul_attrs[key] == 0) {
														ul_attrs[key] = banners_lastIndex;											
													}
													else {
														ul_attrs[key]--;												
													}
												}
											});
											
											$ul.attr(ul_attrs);
											origin.methods.init(origin, ul_attrs);	
										}								
									}
								);
							}						
						});
						
					});
				}
			}
	};
	
	variables.methods.init(variables);
	variables.methods.broadCast(variables);
});