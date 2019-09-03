/**
 * Created by sinarts on 17/1/18.
 */
(function(root, factory) {
    //amd
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else if (typeof exports === "object") {
        //umd
        module.exports = factory();
    } else {
        root.jeTree = factory(window.$ || $);
    }
})(this, function($) {
    $.fn.jeTree = function(options) {
        return this.each(function() {
            return new jeTree($(this), options || {});
        });
    };
    $.extend({
        jeTree:function(elem, options) {
            return $(elem).each(function() {
                return new jeTree($(this), options || {});
            });
        }
    });
    var jeTree = function(elem, opts) {
        var config = {
            skin:"je-tree",
            datas:function () {
                return {url:"",type:"GET",dataType:"json",async:true};
            },
            target:"_blank",                         //是否新选项卡打开（比如节点返回href才有效）
            itemfun:function(val) {},                //点击当前的回调，val：选中的数据
            success:null                             //加载成功后的回调
        };
        this.opts = $.extend(config, opts || {});
        this.elCell = elem;
        this.init();
    };
    var jefn = jeTree.prototype;
    jefn.init = function () {
        var _this = this, opts = _this.opts, datas = "";
        //加载数据
        if (typeof opts.ajaxdatasTree == "function") {
            //通过Ajax方式加载数据
            $.ajax(opts.datas()).done(function(json) {
                datas = json;
            });
        } else if (typeof opts.datas == "object") {
            //直接加载数据
            datas = opts.datas;
        }
        //通过数据加载树列表
        var showlist = $("<ul>",{"class":opts.skin});
        _this.datatree(datas, showlist);
        _this.elCell.append(showlist);

        //加载成功后的回调
        if ($.isFunction(opts.success) || opts.success != ("" || null)) {
            opts.success && opts.success();
        }
    };
    jefn.datatree = function (data, parent) {
        var _this = this;
        $.each(data,function (i,val) {
        	var links = (val.link == "" || val.link == undefined) ? "null" :val.link;
            if (val.childlist != undefined) {
                var liCls = $("<li  class='nav-item' treeid='"+val.tid+"'></li>");
                liCls.append("<a level='"+val.level+"' href='javascript:void(0);' link='"+val.link+"'><span level='"+val.level+"' class='nav-icon'></span><span class='title-name' level='"+val.level+"'>"+val.name+"</span> <span class='icon-parent'></span></a>").append('<ul class=" nav-ul"></ul>').appendTo(parent);
                //将空白的ul作为下一个递归遍历的父亲节点传入
                _this.datatree(val.childlist, liCls.children("ul"));
            }else {
                var liCls = $("<li class='nav-item' treeid='"+val.tid+"'></li>");
                var icons = (val.icon == "" || val.icon == undefined) ? "" :val.icon;
                liCls.append("<a level='"+val.level+"' title='"+val.name+"' target='"+_this.opts.target+" 'link='"+val.link+"'><span level='"+val.level+"' class='nav-icon'></span><span class='title-name' level='"+val.level+"'>"+val.name+"</span></a>").appendTo(parent);
            }
            _this.clicktree(liCls,val);
        });
    };

    jefn.clicktree = function (licell,items) {
        var _this = this, opts = _this.opts;
        licell.children("a").on("click",function(){
            var that = $(this), nextCls = that.next(),parCls = that.parent(), thatSpan = that.find(".icon-parent");
       
            parCls.siblings('.nav-item').find('.nav-ul').slideUp(300);
            parCls.siblings('.nav-item').find('.icon-parent').removeClass('nav-more');
            
            
           
            
            if(!$('.menu').hasClass('menu-mini')){
                if(nextCls.css('display') == 'none'){
                    thatSpan.addClass("nav-more");
                    nextCls.slideDown(300);
                }else{
                    thatSpan.removeClass("nav-more");
                    nextCls.slideUp(300);
                }
            }
            //加载成功后的回调
            if ($.isFunction(opts.itemfun) || opts.itemfun != ("" || null)) {
                opts.itemfun && opts.itemfun(items);
            }
        });
    };
    return jeTree;
});


