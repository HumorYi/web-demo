(function(root, factory, plug) {
	factory(root.jQuery, plug);
})(window, function($, plug) {
	var __DEFAULTS__ = {
		data: []
	};

	var __PROTO__ = {
		// 初始化dom结构
		_init() {
			var html_ul = "";

			this.data.forEach(obj => {
				html_ul += "<li>"+obj.title+"</li>";
			});


			this._$content = $("<ul></ul>").addClass("_content").html(html_ul);
			$(this).append(this._$content);

			this.prevActiveIndex = 0;
			this.activeIndex = 0;
			this._render();
			this._handel();
			this._autoPlay();
		},
		// 渲染图片
		_render() {
			var $li = this._$content.css("backgroundImage", "url("+this.data[this.activeIndex].src+")").find(">li");
			$li.eq(this.prevActiveIndex).removeClass("active");
			$li.eq(this.activeIndex).addClass("active");
		},
		// 定时器自动轮播
		_autoPlay() {
			var _this = this,
					maxCount = this.data.length - 1
			;

			this._timer = setInterval(function() {
				_this.prevActiveIndex = _this.activeIndex;
				_this.activeIndex = _this.activeIndex >= maxCount ? 0 : _this.activeIndex + 1;
				_this._render();
			}, 1000);
		},
		// 事件处理
		_handel() {
			var _this = this,
					$lis = this._$content.find(">li")
			;

			$lis.hover(function(e) {
				_this.prevActiveIndex = _this.activeIndex;
				_this.activeIndex = $(this).index();

				var msg = {
					prevActiveIndex: _this.prevActiveIndex,
					prevActiveDom: $lis.eq(_this.prevActiveIndex),
					activeIndex: _this.activeIndex,
					activeDom: $(this),
				};

				_this._attachEvent("beforeHover", msg);
				clearInterval(_this._timer);
				_this._render();
				_this._attachEvent("AfterHover", msg);
			}, function(e) {
				_this.prevActiveIndex = _this.activeIndex;

				var msg = {
					prevActiveIndex: _this.prevActiveIndex,
					prevActiveDom:$(this),
					activeIndex: _this.activeIndex,
					activeDom: $(this),
				};
				
				_this._attachEvent("beforeLeave", msg);
				_this._autoPlay();
				_this._attachEvent("AfterLeave", msg);
			});
		},
		// 触发自定义搬到事件
		_attachEvent(e, msg) {
			this.trigger(e, msg);
		}
	};

	$.fn[plug] = function(opts) {
		$.extend(this, __DEFAULTS__, opts || {}, __PROTO__);
		this._init();

		return this;
	};

}, "jqueryStairs");