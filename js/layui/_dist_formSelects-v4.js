'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * name: formSelects
 * 基于Layui Select多选
 * version: 4.0.0
 * http://sun.faysunshine.com/layui/formSelects-v4/dist/formSelects-v4.js
 */
(function (layui, window, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		// 支持 CommonJS
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		// 支持 AMD
		define(factory);
	} else if (window.layui && layui.define) {
		//layui加载
		layui.define(function (exports) {
			exports('formSelects', factory());
		});
	} else {
		window.formSelects = factory();
	}
})(layui, window, function () {
	var v = '4.0.0',
	    NAME = 'xm-select',
	    PNAME = 'xm-select-parent',
	    INPUT = 'xm-select-input',
	    TDIV = 'xm-select--suffix',
	    THIS = 'xm-select-this',
	    LABEL = 'xm-select-label',
	    SEARCH = 'xm-select-search',
	    CREATE = 'xm-select-create',
	    CREATE_LONG = 'xm-select-create-long',
	    MAX = 'xm-select-max',
	    SKIN = 'xm-select-skin',
	    DIRECTION = "xm-select-direction",
	    DISABLED = 'layui-disabled',
	    DIS = 'xm-select-dis',
	    TEMP = 'xm-select-temp',
	    DL = 'xm-select-dl',
	    TIPS = '请选择',
	    data = {},
	    events = {
		on: {},
		filter: {},
		maxTips: {}
	},
	    ajax = {
		type: 'get',
		header: {},
		data: {},
		searchName: 'keyword',
		keyName: 'name',
		keyVal: 'value',
		dataType: '',
		delay: 500
	},
	    ajaxs = {},
	    $ = layui.jquery,
	    FormSelects = function FormSelects(options) {
		var _this = this;

		this.config = {
			name: null, //xm-select="xxx"
			max: null,
			maxTips: function maxTips(vals, val, max) {
				var ipt = $('[xid=' + _this.config.name + ']').prev().find('.' + NAME);
				if (ipt.parents('.layui-form-item[pane]').length) {
					ipt = ipt.parents('.layui-form-item[pane]');
				}
				ipt.attr('style', 'border-color: red !important');
				setTimeout(function () {
					ipt.removeAttr('style');
				}, 300);
			},
			init: null, //初始化的选择值,
			on: null, //select值发生变化
			filter: function filter(id, inputVal, val, isDisabled) {
				return val.name.indexOf(inputVal) == -1;
			},
			clearid: -1,
			direction: 'auto'
		};
		this.select = null;
		this.values = [];
		$.extend(true, this.config, options);
	};

	//一些简单的处理方法
	var Common = function Common() {
		this.appender();
		this.init();
		this.on();
		this.initVal();
		this.loadingCss();
	};

	Common.prototype.appender = function () {
		//针对IE做的一些拓展
		if (!Array.prototype.map) {
			Array.prototype.map = function (callback, thisArg) {
				var T,
				    A,
				    k,
				    O = Object(this),
				    len = O.length >>> 0;
				if (thisArg) {
					T = thisArg;
				}
				A = new Array(len);
				k = 0;
				while (k < len) {
					var kValue, mappedValue;
					if (k in O) {
						kValue = O[k];
						mappedValue = callback.call(T, kValue, k, O);
						A[k] = mappedValue;
					}
					k++;
				}
				return A;
			};
		}
		if (!Array.prototype.forEach) {
			Array.prototype.forEach = function forEach(callback, thisArg) {
				var T, k;
				if (this == null) {
					throw new TypeError("this is null or not defined");
				}
				var O = Object(this);
				var len = O.length >>> 0;
				if (typeof callback !== "function") {
					throw new TypeError(callback + " is not a function");
				}
				if (arguments.length > 1) {
					T = thisArg;
				}
				k = 0;
				while (k < len) {
					var kValue;
					if (k in O) {

						kValue = O[k];
						callback.call(T, kValue, k, O);
					}
					k++;
				}
			};
		}
	};

	Common.prototype.init = function (target) {
		var _this2 = this;

		//初始化页面上已有的select
		$(target ? target : 'select[' + NAME + ']').each(function (index, select) {
			var othis = $(select),
			    id = othis.attr(NAME),
			    hasRender = othis.next('.layui-form-select'),
			    disabled = select.disabled,
			    max = othis.attr(MAX) - 0,
			    isSearch = othis.attr(SEARCH) != undefined,
			    searchUrl = isSearch ? othis.attr(SEARCH) : null,
			    isCreate = othis.attr(CREATE) != undefined,
			    skin = othis.attr(SKIN),
			    direction = othis.attr(DIRECTION),
			    optionsFirst = select.options[0],
			    placeholder = optionsFirst ? optionsFirst.value ? TIPS : optionsFirst.innerHTML || TIPS : TIPS,
			    value = othis.find('option[selected]').toArray().map(function (option) {
				//获取已选中的数据
				return {
					name: option.innerHTML,
					val: option.value
				};
			}),
			    fs = new FormSelects();

			//先取消layui对select的渲染
			hasRender[0] && hasRender.remove();

			//包裹一个div
			othis.wrap('<div class="' + PNAME + '"></div>');

			//构造渲染div
			var dinfo = _this2.renderSelect(placeholder, select);
			var reElem = $('\n\t\t\t\t<div class="layui-form-select" ' + SKIN + '="' + skin + '">\n\t\t\t\t\t<div class="layui-select-title ' + (disabled ? DIS : '') + '">\n\t\t\t\t\t\t<div class="layui-input ' + NAME + '">\n\t\t\t\t\t\t\t<div class="' + LABEL + '">\n\t\t\t\t\t\t\t\t<input type="text" fsw class="layui-input ' + INPUT + '" ' + (isSearch ? '' : 'style="display: none;"') + ' autocomplete="off" debounce="0" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<i class="layui-edge"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="' + TDIV + '">\n\t\t\t\t\t\t\t<input type="text" autocomplete="off" placeholder="' + placeholder + '" readonly="readonly" unselectable="on" class="layui-input">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<dl xid="' + id + '" class="layui-anim layui-anim-upbit ' + DL + '">' + dinfo + '</dl>\n\t\t\t\t</div>\n\t\t\t');
			othis.after(reElem);
			fs.select = othis.remove(); //去掉layui.form.render
			fs.values = value;
			fs.config.name = id;
			fs.config.init = value.concat([]);
			fs.config.direction = direction;

			if (max) {
				//有最大值
				fs.config.max = max;
			}

			//如果可搜索, 加上事件
			if (isSearch) {
				reElem.find('.' + INPUT).on('input propertychange', function (e) {
					var input = e.target,
					    inputValue = $.trim(input.value),
					    keyCode = e.keyCode;
					if (keyCode === 9 || keyCode === 13 || keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
						return false;
					}

					//过滤一下tips
					_this2.changePlaceHolder($(input));

					//如果开启了远程搜索
					if (searchUrl) {
						var ajaxConfig = ajaxs[id] ? ajaxs[id] : ajax,
						    ajaxData = $.extend(true, {}, ajaxConfig.data);
						ajaxData[ajaxConfig.searchName] = inputValue;

						clearTimeout(fs.clearid);
						fs.clearid = setTimeout(function () {
							reElem.find('dl > *:not(.layui-select-tips)').remove();
							reElem.find('dd.layui-select-none').addClass('xm-select-empty').text('请求中');
							$.ajax({
								type: ajaxConfig.type,
								headers: ajaxConfig.header,
								url: searchUrl,
								data: ajaxConfig.dataType == 'json' ? JSON.stringify(ajaxData) : ajaxData,
								success: function success(res) {
									if (typeof res == 'string') {
										res = JSON.parse(res);
									}
									if (res.code != 0) {
										reElem.find('dd.layui-select-none').addClass('xm-select-empty').text(res.msg);
									} else {
										reElem.find('dd.layui-select-none').removeClass('xm-select-empty');
										reElem.find('dl').html(_this2.renderSelect(placeholder, res.data.map(function (item) {
											return {
												name: item[ajaxConfig.keyName],
												value: item[ajaxConfig.keyVal]
											};
										})));
										var label = reElem.find('.' + LABEL);
										fs.values.forEach(function (item, index) {
											reElem.find('dl dd[lay-value=' + item.val + ']').addClass(THIS);
										});
									}
								},
								error: function error(res) {
									reElem.find('dd.layui-select-none').addClass('xm-select-empty').text('服务异常');
								}
							});
						}, ajaxConfig.delay);
					} else {
						reElem.find('dl .layui-hide').removeClass('layui-hide');
						//遍历选项, 选择可以显示的值
						reElem.find('dl dd:not(.layui-select-tips)').each(function (idx, item) {
							var _item = $(item);
							var searchFun = data[id].config.filter || events.filter[id];
							if (searchFun && searchFun(id, inputValue, {
								name: _item.find('span').text(),
								val: _item.attr('lay-value')
							}, _item.hasClass(DISABLED)) == true) {
								_item.addClass('layui-hide');
							}
						});
						//控制分组名称
						reElem.find('dl dt').each(function (index, item) {
							if (!$(item).nextUntil('dt', ':not(.layui-hide)').length) {
								$(item).addClass('layui-hide');
							}
						});
						//动态创建
						_this2.create(id, isCreate, inputValue);
						var shows = reElem.find('dl dd:not(.layui-select-tips):not(.layui-hide)');
						if (!shows.length) {
							reElem.find('dd.layui-select-none').addClass('xm-select-empty').text('无匹配项');
						} else {
							reElem.find('dd.layui-select-none').removeClass('xm-select-empty');
						}
					}
				});
				if (searchUrl) {
					var obj_caller = reElem.find('.' + INPUT)[0];
					if (document.createEventObject) {
						obj_caller.fireEvent("onchange");
					} else {
						var evt = document.createEvent("HTMLEvents");
						evt.initEvent("input", false, true);
						obj_caller.dispatchEvent(evt);
					}
				}
			}

			data[id] = fs;
		});
	};

	Common.prototype.create = function (id, isCreate, inputValue) {
		if (isCreate && inputValue) {
			var fs = data[id],
			    dl = $('[xid=' + id + ']'),
			    tips = dl.find('dd.layui-select-tips:first'),
			    tdd = null,
			    temp = dl.find('dd.' + TEMP);
			dl.find('dd:not(.layui-select-tips):not(.' + TEMP + ')').each(function (index, item) {
				if (inputValue == $(item).find('span').text()) {
					tdd = item;
				}
			});
			if (!tdd) {
				//如果不存在, 则创建
				if (temp[0]) {
					temp.attr('lay-value', inputValue);
					temp.find('span').text(inputValue);
					temp.removeClass('layui-hide');
				} else {
					tips.after($('\n\t\t\t\t\t\t<dd lay-value="' + Date.now() + '" class="' + TEMP + ' ' + CREATE_LONG + '">\n\t\t\t\t\t\t\t<div class="layui-unselect layui-form-checkbox" lay-skin="primary">\n\t\t\t\t\t\t\t\t<span>' + inputValue + '</span>\n\t\t\t\t\t\t\t\t<i class="layui-icon layui-icon-ok"></i>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t  \t</dd>\t\n\t\t\t\t\t'));
				}
			}
		} else {
			$('[xid=' + id + '] dd.' + TEMP).remove();
		}
	};

	Common.prototype.renderSelect = function (tips, select) {
		var arr = [];
		//		arr.push(`<dd lay-value="" class="layui-select-tips">各种复杂的地方操作</dd>`);
		arr.push('<dd lay-value="" class="layui-select-tips">' + tips + '</dd>');
		if (select instanceof Array) {
			$(select).each(function (index, item) {
				if (index === 0 && !item.value) {} else if (item.type === 'optgroup') {
					arr.push('<dt>' + item.name + '</dt>');
				} else {
					arr.push('<dd lay-value="' + item.value + '" class="' + (item.disabled ? DISABLED : '') + '">\n\t\t\t\t\t\t\t\t<div class="layui-unselect layui-form-checkbox ' + (item.disabled ? 'layui-checkbox-disbaled ' + DISABLED : '') + '" lay-skin="primary">\n\t\t\t\t\t\t\t\t\t<span>' + item.name + '</span>\n\t\t\t\t\t\t\t\t\t<i class="layui-icon layui-icon-ok"></i>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t  </dd>');
				}
			});
		} else {
			$(select).find('*').each(function (index, item) {
				if (item.tagName.toLowerCase() == 'option' && index == 0 && !item.value) {
					return;
				}
				if (item.tagName.toLowerCase() === 'optgroup') {
					arr.push('<dt>' + item.label + '</dt>');
				} else {
					arr.push('<dd lay-value="' + item.value + '" class="' + (item.disabled ? DISABLED : '') + '">\n\t\t\t\t\t\t\t\t<div class="layui-unselect layui-form-checkbox ' + (item.disabled ? 'layui-checkbox-disbaled ' + DISABLED : '') + '" lay-skin="primary">\n\t\t\t\t\t\t\t\t\t<span>' + $.trim(item.innerHTML) + '</span>\n\t\t\t\t\t\t\t\t\t<i class="layui-icon layui-icon-ok"></i>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t  </dd>');
				}
			});
		}
		arr.push('<dt style="display:none;"> </dt>');
		arr.push('<dd class="layui-select-tips layui-select-none ' + (arr.length === 1 ? 'xm-select-empty' : '') + '">\u6CA1\u6709\u9009\u9879</dd>');
		return arr.join('');
	};

	Common.prototype.on = function () {
		//事件绑定
		this.one();

		//绑定input的focus和blur, 用来调整宽度滴
		/*$(document).on({
  	focus: (e) => {//选中时, 把宽度调整至最大
  		let othis = $(e.target),
  			div = othis.parent();
  		let hasSpan = div.find('span:last')[0];
  		let left = hasSpan ? hasSpan.offsetLeft + hasSpan.clientWidth : 9
  		othis.css({
  			width: div.parent().width() - left < 50 ? '100%' : div.parent().width() - left,
  		});
  	},
  	blue: (e) => {//失去是调整为50
  		$(e.target).css('width', '50px');
  	}
  }, `.${PNAME} .${INPUT}`);*/

		$(document).on('click', function (e) {
			if (!$(e.target).parents('.layui-select-title')[0]) {
				//清空input中的值
				$('.' + INPUT).val('');
				$('.' + PNAME + ' dl .layui-hide').removeClass('layui-hide');
				$('.' + PNAME + ' dl dd.' + TEMP).remove();
			}
			$('.' + PNAME + ' .layui-form-selected').removeClass('layui-form-selected');
		});
	};

	Common.prototype.one = function (target) {
		var _this3 = this;

		//一次性事件绑定
		$(target ? target : document).find('.layui-select-title').off('click').on('click', function (e) {
			var othis = $(e.target),
			    title = othis.is('.layui-select-title') ? othis : othis.parents('.layui-select-title'),
			    dl = title.next(),
			    id = dl.attr('xid');

			//清空非本select的input val
			$('dl[xid]').not(dl).prev().find('.' + INPUT).val('');
			$('dl[xid]').not(dl).find('dd.layui-hide').removeClass('layui-hide');

			//如果是disabled select
			if (title.hasClass(DIS)) {
				return false;
			}
			//如果点击的是右边的三角或者只读的input
			if (othis.is('.layui-edge') || othis.is('.' + INPUT + '[readonly]')) {
				_this3.changeShow(title, !title.parents('.layui-form-select').hasClass('layui-form-selected'));
				return false;
			}
			//如果点击的是input的右边, focus一下
			if (title.find('.' + INPUT + ':not(readonly)')[0]) {
				var input = title.find('.' + INPUT),
				    epos = { x: e.pageX, y: e.pageY },
				    pos = _this3.getPosition(title[0]),
				    width = title.width();
				while (epos.x > pos.x) {
					if ($(document.elementFromPoint(epos.x, epos.y)).is(input)) {
						input.focus();
						_this3.changeShow(title, true);
						return false;
					}
					epos.x -= 50;
				}
			}

			//如果点击的是可搜索的input
			if (othis.is('.' + INPUT)) {
				_this3.changeShow(title, true);
				return false;
			}
			//如果点击的是x按钮
			if (othis.is('i[fsw=' + NAME + ']')) {
				var val = {
					name: othis.prev().text(),
					val: othis.parent().attr("value")
				},
				    dd = dl.find('dd[lay-value=\'' + val.val + '\']');
				if (dd.hasClass(DISABLED)) {
					//如果是disabled状态, 不可选, 不可删
					return false;
				}
				_this3.handlerLabel(id, dd, false, val);
				return false;
			}

			_this3.changeShow(title, !title.parents('.layui-form-select').hasClass('layui-form-selected'));
			return false;
		});
		$(target ? target : document).find('dl.' + DL).off('click').on('click', function (e) {
			var othis = $(e.target);
			if (othis.is('dt')) {
				return false;
			}

			var dd = othis.is('dd') ? othis : othis.parents('dd');
			var id = dd.parent('dl').attr('xid');
			if (dd.hasClass(DISABLED)) {
				//被禁用选项的处理
				return false;
			}
			if (dd.hasClass('layui-select-tips')) {
				//tips的处理

				return false;
			}

			var isAdd = !dd.hasClass(THIS);
			_this3.handlerLabel(id, dd, isAdd);
			return false;
		});
	};

	Common.prototype.initVal = function (id) {
		var _this4 = this;

		var target = {};
		if (id) {
			target[id] = data[id];
		} else {
			target = data;
		}
		$.each(target, function (key, val) {
			var values = val.values,
			    div = $('dl[xid=' + key + ']').parent(),
			    label = div.find('.' + LABEL),
			    dl = div.find('dl');
			dl.find('dd.' + THIS).removeClass(THIS);
			values.forEach(function (item, index) {
				_this4.addLabel(key, label, item);
				dl.find('dd[lay-value=' + item.val + ']').addClass(THIS);
			});
			//计算input的提示语
			_this4.changePlaceHolder(label);
			//计算高度
			_this4.retop(div.parent());
		});
	};

	Common.prototype.handlerLabel = function (id, dd, isAdd, oval) {
		var div = $('[xid=' + id + ']').prev().find('.' + LABEL),
		    val = {
			name: dd.find('span').text(),
			val: dd.attr('lay-value')
		},
		    vals = data[id].values,
		    on = data[id].config.on || events.on[id];
		if (oval) {
			val = oval;
		}
		var fs = data[id];
		if (isAdd && fs.config.max && fs.values.length >= fs.config.max) {
			var maxTipsFun = data[id].config.maxTips || events.maxTips[id];
			maxTipsFun && maxTipsFun(id, vals.concat([]), val, fs.max);
			return;
		}
		if (on && on instanceof Function && on(id, vals.concat([]), val, isAdd, dd.hasClass(DISABLED)) == false) {
			return;
		}
		isAdd ? (dd.addClass(THIS), dd.removeClass(TEMP), this.addLabel(id, div, val), vals.push(val)) : (dd.removeClass(THIS), this.delLabel(id, div, val), this.remove(vals, val));

		if (!div[0]) return;

		//计算input left
		this.changePlaceHolder(div);
		//计算高度
		this.retop(div.parents('.layui-form-select'));
	};

	Common.prototype.addLabel = function (id, div, val) {
		if (!val) return;
		var tips = 'fsw="' + NAME + '"';
		var _ref = [$('<span ' + tips + ' value="' + val.val + '"><font ' + tips + '>' + val.name + '</font></span>'), $('<i ' + tips + ' class="layui-icon">&#x1006;</i>')],
		    $label = _ref[0],
		    $close = _ref[1];

		$label.append($close);
		div.find('input').css('width', '50px');
		div.find('input').before($label);
	};

	Common.prototype.delLabel = function (id, div, val) {
		if (!val) return;
		div.find('span[value=' + val.val + ']:first').remove();
	};

	Common.prototype.retop = function (div) {
		//计算dl显示的位置
		var dl = div.find('dl');
		var up = div.hasClass('layui-form-selectup') || dl.css('top').indexOf('-') != -1;
		div = div.find('.' + NAME);

		var fs = data[dl.attr('xid')];
		if (fs) {
			if (fs.config.direction == 'up') {
				dl.css({
					top: 'auto',
					bottom: '42px'
				});
				return;
			}
			if (fs.direction == 'down') {
				dl.css({
					top: div[0].offsetTop + div.height() + 14 + 'px',
					bottom: 'auto'
				});
				return;
			}
		}

		if (up) {
			dl.css({
				top: 'auto',
				bottom: '42px'
			});
		} else {
			dl.css({
				top: div[0].offsetTop + div.height() + 14 + 'px',
				bottom: 'auto'
			});
		}
	};

	Common.prototype.changeShow = function (children, isShow) {
		//显示于隐藏
		var top = children.parents('.layui-form-select');
		$('.layui-form-select').not(top).removeClass('layui-form-selected');
		if (isShow) {
			this.retop(top);
			top.addClass('layui-form-selected');
			top.find('.' + INPUT).focus();
		} else {
			top.removeClass('layui-form-selected');
			top.find('.' + INPUT).val('');
			top.find('dl .layui-hide').removeClass('layui-hide');
			top.find('dl dd.' + TEMP).remove();
		}
	};

	Common.prototype.changePlaceHolder = function (div) {
		//显示于隐藏提示语
		//调整pane模式下的高度
		var title = div.parents('.layui-select-title');
		title.css('height', title.find('.' + NAME)[0].clientHeight + 2 + 'px');

		var input = title.find('.' + TDIV + ' input'),
		    isShow = !div.find('span:last')[0] && !title.find('.' + LABEL + ' input').val();
		if (isShow) {
			var ph = input.attr('back');
			input.removeAttr('back');
			input.attr('placeholder', ph);
		} else {
			var _ph = input.attr('placeholder');
			input.removeAttr('placeholder');
			input.attr('back', _ph);
		}
	};

	Common.prototype.indexOf = function (arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].val == val || arr[i].val == (val ? val.val : val) || arr[i] == val || JSON.stringify(arr[i]) == JSON.stringify(val)) {
				return i;
			}
		}
		return -1;
	};

	Common.prototype.remove = function (arr, val) {
		var idx = this.indexOf(arr, val ? val.val : val);
		if (idx > -1) {
			arr.splice(idx, 1);
			return true;
		}
		return false;
	};

	Common.prototype.removeAll = function (id) {
		var _this5 = this;

		var dl = $('[xid=' + id + ']');
		data[id].values.concat([]).forEach(function (item, index) {
			_this5.handlerLabel(id, dl.find('dd[lay-value=' + item.val + ']'), false, item);
		});
	};

	Common.prototype.getPosition = function (e) {
		var x = 0,
		    y = 0;
		while (e != null) {
			x += e.offsetLeft;
			y += e.offsetTop;
			e = e.offsetParent;
		}
		return { x: x, y: y };
	};

	Common.prototype.loadingCss = function () {
		var cssStyle = $('<style type="text/css">.xm-select-parent {-moz-user-select: none;-ms-user-select: none;-webkit-user-select: none;}.xm-select-parent .xm-select {line-height: normal;height: auto;padding: 4px 10px 1px 10px;overflow: hidden;height: 30px;overflow:hidden;left: 0px;z-index: 99;position: absolute;background: none;padding-right: 20px;}.xm-select-parent .xm-select:hover {border-color: #C0C4CC;}.xm-select-parent .xm-select .xm-select-label {display: inline-block;margin: 0;vertical-align: middle;}.xm-select-parent .layui-select-title div.xm-select-label>span {padding: 0px 5px;background-color: #009688;border-radius: 2px;color: #FFFFFF;display: inline-block;line-height: 18px;height: 18px;margin: 2px 5px 2px 0px;cursor: initial;user-select: none;font-size: 14px;}.xm-select-parent .layui-select-title div.xm-select-label>span i {margin-left: 8px;border-radius: 20px;font-size: 12px;cursor: pointer;}.xm-select-parent .xm-select .xm-select-input {border: none;height: 28px;background-color: transparent;padding: 0;vertical-align: middle;display: inline-block;width: 50px;}.xm-select-parent .xm-select--suffix {}.xm-select-parent .xm-select--suffix input {border: none;}.xm-select-parent dl dd.layui-disabled.xm-select-this i {border-color: #C2C2C2;background-color: #C2C2C2;color: #FFFFFF;}.xm-select-parent dl dd.xm-select-this i {background-color: #009688;border-color: #009688;}.layui-form-selected .xm-select,.layui-form-selected .xm-select:hover {border-color: #009688!important;}.layui-form-pane .xm-select,.layui-form-pane .xm-select:hover {border: none!important;top: 2px;}.layui-form-pane .layui-select-title {border-left: 1px solid #e6e6e6!important;}.xm-select--suffix+div {position: absolute;top: 0;left: 0;bottom: 0;right: 0;}.xm-select-dis .xm-select--suffix+div {z-index: 100;cursor: no-drop!important;}.xm-select-disabled {}.xm-select-disabled,.xm-select-disabled:hover {color: #d2d2d2!important;cursor: not-allowed!important;background-color: #fff;}.layui-select-none{display: none;}.layui-select-none:hover{background-color: #FFF!important;}.xm-select-empty{display: block;}/*color*/div[xm-select-skin] .layui-select-title div.xm-select-label > span i:hover{opacity:.8;filter:alpha(opacity=80);cursor: pointer;}/*default*/div[xm-select-skin=\'default\'] .layui-select-title div.xm-select-label > span{background-color: #F0F2F5;color: #909399;border: 1px solid #F0F2F5;}div[xm-select-skin=\'default\'] .layui-select-title div.xm-select-label > span i{background-color: #C0C4CC;color: #FFFFFF;}div[xm-select-skin=\'default\'] dl dd.xm-select-this:not(.layui-disabled) i{background-color: #5FB878;border-color: #5FB878;color: #FFFFFF;}div[xm-select-skin=\'default\'].layui-form-selected .xm-select,div[xm-select-skin=\'default\'].layui-form-selected .xm-select:hover {border-color: #C0C4CC !important;}/*primary*/div[xm-select-skin=\'primary\'] .layui-select-title div.xm-select-label > span{background-color: #009688;color: #FFFFFF;border: 1px solid #009688;}div[xm-select-skin=\'primary\'] .layui-select-title div.xm-select-label > span i{background-color: #009688;color: #FFFFFF;}div[xm-select-skin=\'primary\'] dl dd.xm-select-this:not(.layui-disabled) i{background-color: #009688;border-color: #009688;color: #FFFFFF;}div[xm-select-skin=\'primary\'].layui-form-selected .xm-select,div[xm-select-skin=\'primary\'].layui-form-selected .xm-select:hover {border-color: #1E9FFF !important;}/*normal*/div[xm-select-skin=\'normal\'] .layui-select-title div.xm-select-label > span{background-color: #1E9FFF;color: #FFFFFF;border: 1px solid #1E9FFF;}div[xm-select-skin=\'normal\'] .layui-select-title div.xm-select-label > span i{background-color: #1E9FFF;color: #FFFFFF;}div[xm-select-skin=\'normal\'] dl dd.xm-select-this:not(.layui-disabled) i{background-color: #1E9FFF;border-color: #1E9FFF;color: #FFFFFF;}div[xm-select-skin=\'normal\'].layui-form-selected .xm-select,div[xm-select-skin=\'normal\'].layui-form-selected .xm-select:hover {border-color: #1E9FFF !important;}/*warm*/div[xm-select-skin=\'warm\'] .layui-select-title div.xm-select-label > span{background-color: #FFB800;color: #FFFFFF;border: 1px solid #FFB800;}div[xm-select-skin=\'warm\'] .layui-select-title div.xm-select-label > span i{background-color: #FFB800;color: #FFFFFF;}div[xm-select-skin=\'warm\'] dl dd.xm-select-this:not(.layui-disabled) i{background-color: #FFB800;border-color: #FFB800;color: #FFFFFF;}div[xm-select-skin=\'warm\'].layui-form-selected .xm-select,div[xm-select-skin=\'warm\'].layui-form-selected .xm-select:hover {border-color: #FFB800 !important;}/*danger*/div[xm-select-skin=\'danger\'] .layui-select-title div.xm-select-label > span{background-color: #FF5722;color: #FFFFFF;border: 1px solid #FF5722;}div[xm-select-skin=\'danger\'] .layui-select-title div.xm-select-label > span i{background-color: #FF5722;color: #FFFFFF;}div[xm-select-skin=\'danger\'] dl dd.xm-select-this:not(.layui-disabled) i{background-color: #FF5722;border-color: #FF5722;color: #FFFFFF;}div[xm-select-skin=\'danger\'].layui-form-selected .xm-select,div[xm-select-skin=\'danger\'].layui-form-selected .xm-select:hover {border-color: #FFB800 !important;}</style>');
		$('head link:last')[0] && $('head link:last').after(cssStyle) || $('head').append(cssStyle);
	};

	var Select4 = function Select4() {
		this.v = v;
	};
	var common = new Common();

	Select4.prototype.value = function (id, type, isAppend) {
		if (typeof id != 'string') {
			return [];
		}
		var fs = data[id];
		if (!fs) {
			return [];
		}
		if (typeof type == 'string' || type == undefined) {
			var arr = fs.values.concat([]) || [];
			if (type == 'val') {
				return arr.map(function (val) {
					return val.val;
				});
			}
			if (type == 'valStr') {
				return arr.map(function (val) {
					return val.val;
				}).join(',');
			}
			if (type == 'name') {
				return arr.map(function (val) {
					return val.name;
				});
			}
			if (type == 'nameStr') {
				return arr.map(function (val) {
					return val.name;
				}).join(',');
			}
			return arr;
		}
		if (type instanceof Array) {
			var dl = $('[xid=' + id + ']'),
			    temp = {},
			    dd = void 0,
			    isAdd = true;
			if (isAppend == false) {
				//删除传入的数组
				isAdd = false;
			} else if (isAppend == true) {
				//追加模式
				isAdd = true;
			} else {
				//删除原有的数据
				common.removeAll(id);
			}
			if (isAdd) {
				fs.values.forEach(function (val, index) {
					temp[val.val] = 1;
				});
			}
			type.forEach(function (val, index) {
				if (val && (!temp[val] || fs.config.repeat) && (dd = dl.find('dd[lay-value=' + val + ']'))[0]) {
					common.handlerLabel(id, dd, isAdd);
					temp[val] = 1;
				}
			});
		}
	};

	Common.prototype.bindEvent = function (name, id, fun) {
		if (id && id instanceof Function) {
			fun = id;
			id = null;
		}
		if (fun && fun instanceof Function) {
			if (!id) {
				$.each(data, function (id, val) {
					data[id] ? data[id].config[name] = fun : events[name][id] = fun;
				});
			} else {
				data[id] ? data[id].config[name] = fun : events[name][id] = fun;
			}
		}
	};

	Select4.prototype.on = function (id, fun) {
		common.bindEvent('on', id, fun);
	};

	Select4.prototype.filter = function (id, fun) {
		common.bindEvent('filter', id, fun);
	};

	Select4.prototype.maxTips = function (id, fun) {
		common.bindEvent('maxTips', id, fun);
	};

	Select4.prototype.config = function (id, config, isJson) {
		if (id && (typeof id === 'undefined' ? 'undefined' : _typeof(id)) == 'object') {
			isJson = config == true;
			config = id;
			id = null;
		}
		if (config && (typeof config === 'undefined' ? 'undefined' : _typeof(config)) == 'object') {
			if (isJson) {
				config.header || (config.header = {});
				config.header['Content-Type'] = 'application/json; charset=UTF-8';
				config.dataType = 'json';
			}
			id ? (ajaxs[id] = $.extend(true, {}, ajax, config), data[id] && (data[id].config.direction = config.direction)) : $.extend(true, ajax, config);
		}
	};

	Select4.prototype.render = function (id) {
		var _this6 = this;

		var target = void 0;
		if (id) {
			target = {};
			if (data[id]) {
				target[id] = data[id];
			}
		} else {
			target = data;
		}

		if (target) {
			//对已有的重新渲染, 渲染啥呢???
			$.each(target, function (key, val) {
				//恢复初始值
				var dl = $('dl[xid=' + id + ']'),
				    vals = [];
				val.select.find('option[selected]').each(function (index, item) {
					vals.push(item.value);
				});
				//移除创建元素
				dl.find('.' + CREATE_LONG).remove();
				//清空INPUT
				dl.prev().find('.' + INPUT).val('');
				//移除hidn
				dl.find('.layui-hide').removeClass('layui-hide');
				//重新赋值
				_this6.value(id, vals);
			});
			return;
		}

		var select = $('select[' + NAME + '=' + id + ']');
		if (select[0]) {
			common.init(select);
			common.one($('dl[xid=' + id + ']').parents('.' + PNAME));
			common.initVal(id);
		}
	};

	return new Select4();
});