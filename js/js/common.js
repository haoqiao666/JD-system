
/* 点击iframe去掉下拉框 */
$('body').click(function () {
    $(".dropdown", window.parent.document).removeClass('open');
});
// 模态框移动
$(function () {
    var dragModal = {
        mouseStartPoint: {
            "left": 0,
            "top": 0
        }, // 起始点
        mouseEndPoint: {
            "left": 0,
            "top": 0
        }, // 结束点
        mouseDragDown: false, // 是否按下
        basePoint: {
            "left": 0,
            "top": 0
        }, // 相对基点
        moveTarget: null,
        topleng: 0
    };
    $(document).on("mousedown", ".modal-header", function (e) { // 作用在模态标题框
        // webkit内核和火狐禁止文字被选中
        $('body').addClass('select');
        // ie浏览器禁止文字选中
        document.body.onselectstart = document.body.ondrag = function () {
            return false;
        };
        if ($(e.target).hasClass("close"))// 点关闭按钮不能移动对话框
            return;
        dragModal.mouseDragDown = true;
        dragModal.moveTarget = $(this).parents('.modal-content');
        dragModal.mouseStartPoint = {
            "left": e.clientX,
            "top": e.pageY
        };
        dragModal.basePoint = dragModal.moveTarget.offset();
        dragModal.topLeng = e.pageY - e.clientY;
    });
    $(document).on("mouseup", function (e) {
        dragModal.mouseDragDown = false;
        dragModal.moveTarget = undefined;
        dragModal.mouseStartPoint = {
            "left": 0,
            "top": 0
        };
        dragModal.basePoint = {
            "left": 0,
            "top": 0
        };
    });
    $(document).on("mousemove", function (e) {
        if (!dragModal.mouseDragDown
            || dragModal.moveTarget == undefined)
            return;
        var mousX = e.clientX;
        var mousY = e.pageY;

        if (mousX < 0)
            mousX = 0;
        if (mousY < 0)
            mousY = 0;

        dragModal.mouseEndPoint = {
            "left": mousX,
            "top": mousY
        };

        var width = dragModal.moveTarget.width();
        var height = dragModal.moveTarget.height();
        var clientWidth = document.body.clientWidth;
        var clientHeight = document.body.clientHeight;
        if (dragModal.mouseEndPoint.left < dragModal.mouseStartPoint.left
            - dragModal.basePoint.left) {
            dragModal.mouseEndPoint.left = 0;
        } else if (dragModal.mouseEndPoint.left >= clientWidth
            - width + dragModal.mouseStartPoint.left
            - dragModal.basePoint.left) {
            dragModal.mouseEndPoint.left = clientWidth - width
                - 2;
        } else {
            dragModal.mouseEndPoint.left = dragModal.mouseEndPoint.left
                - (dragModal.mouseStartPoint.left - dragModal.basePoint.left);// 移动修正，更平滑
        }
        if (dragModal.mouseEndPoint.top
            - (dragModal.mouseStartPoint.top - dragModal.basePoint.top) < dragModal.topLeng) {
            dragModal.mouseEndPoint.top = dragModal.topLeng;
        } else if (dragModal.mouseEndPoint.top
            - dragModal.topLeng > clientHeight - height
            + dragModal.mouseStartPoint.top
            - dragModal.basePoint.top) {
            dragModal.mouseEndPoint.top = clientHeight - height
                - 2 + dragModal.topLeng;
        } else {
            dragModal.mouseEndPoint.top = dragModal.mouseEndPoint.top
                - (dragModal.mouseStartPoint.top - dragModal.basePoint.top);
        }
        dragModal.moveTarget.offset(dragModal.mouseEndPoint);
    });
    $(document).on('hidden.bs.modal', '.modal', function (e) {
        $('.modal-dialog,.modal-content').css({
            'top': '0px',
            'left': '0px'
        });
        $('body').removeClass('select');
        document.body.onselectstart = document.body.ondrag = null;
    });
})
/*layui中的时间,正则*/
layui.use(['laydate','form','upload'], function(){
    var laydate = layui.laydate;
    var form = layui.form;
    var upload = layui.upload;
    laydate.render({
        elem: '#date'
        ,theme: '#393D49'
        ,range: true
    });
    laydate.render({
        elem: '#test1'
        ,theme: '#393D49'
    });
    laydate.render({
        elem: '#time_interval'
        ,type: 'time'
        ,theme: '#393D49'
        ,range: true
    });
    laydate.render({
        elem: '#dateTime'
        ,type: 'datetime'
        ,theme: '#393D49'
        ,range: true
    });
    form.verify({
        ip: [/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/, 'IP格式错误'],
        port: function (value) {
            if (value > 65535 || value <= 0) {
                return "端口错误";
            }
        },
        pass: [/(.+){6,12}$/, '密码必须6到12位'],
        minutes:function(value) {
            if (value > 240 || value < 1) {
                return "时间间隔为1~240";
            }
        },
        minutesWeb:function(value) {
            if (value > 120 || value < 1) {
                return "时间间隔为1~120";
            }
        },
        counts:function(value) {
            if (value > 1000 || value < 5) {
                return "办理次数为5~1000";
            }
        },
        countsWeb:function(value) {
            if (value > 20 || value < 3) {
                return "办理次数为3~20";
            }
        },
        senNum:function(value) {
            if (value > 200 || value < 1) {
                return "涉敏信息个数为1~200";
            }
        },
        time: function (value, item) {
            var startTime = value.split('-')[0].trim();
            var endTime = value.split('-')[1].trim();
            if( startTime == endTime) {
                return "结束时间必须大于开始时间";
            }
        }
    });
    upload.render({ //允许上传的文件后缀
        elem: '#upload'
        ,url: ''
        ,accept: 'file' ,//普通文件
        acceptMime:'application/zip',
        exts: 'zip|rar|7z',
        auto: false,
        bindAction: '#upgrade_btn',
        before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layer.msg('该功能暂未开放');
            /*layer.msg('上传中..', {
                icon: 16
                ,shade: 0.01
            });*/
        }
        ,done: function(res){
            console.log(res)
        }
    });
});
/***************新增layui表格操作**************/
/*layui表格*/
layui.use('table',function(){
    var table = layui.table;
    table.on('tool(single)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){ //详情
            layer.open({
                type:1,
                title:'详情窗口',
                area:['390px','260px'],
                maxmin:true,
                content:'各自信息怎么携带？？？？？？？？？？？？',
                btn:['关闭']
            })
        }else if(obj.event === 'del'){ //单个删除
            layer.confirm('<i class="glyphicon glyphicon-info-sign" style="color:#FFB800"></i>&nbsp;&nbsp;确定要删除此信息？', function(index){
                obj.del();
                layer.close(index);
                layer.msg('操作成功');
                return;
            });
        }
    });



    var active = {
        deleteAll: function(){  //全部删除
            var checkStatus = table.checkStatus('tableId'),
                data = checkStatus.data;
            if(data.length < 1){
                layer.msg('请选择要操作的信息');
                return;
            }else{
                layer.confirm('<i class="glyphicon glyphicon-info-sign" style="color:#FFB800"></i>&nbsp;&nbsp;确定要删除此信息？', function(index){
                   /* obj.del();*/
                    layer.close(index);
                    layer.msg('操作成功');
                    return;
                });
            }
        },
        ignoreAll:function(){  //全部忽略
            var checkStatus = table.checkStatus('tableId'),
                data = checkStatus.data;
            if(data.length < 1){
                layer.msg('请选择要操作的信息');
                return;
            }else{
                layer.confirm('<i class="glyphicon glyphicon-info-sign" style="color:#FFB800"></i>&nbsp;&nbsp;确定要忽略此信息？', function(index){
                    /* obj.del();*/
                    layer.close(index);
                    layer.msg('操作成功');
                    return;
                });
            }
        },
        openAll:function(){  //批量开放
            var checkStatus = table.checkStatus('tableId'),
                data = checkStatus.data;
            if(data.length < 1){
                layer.msg('请选择要操作的信息');
                return;
            }else{
                layer.confirm('<i class="glyphicon glyphicon-info-sign" style="color:#FFB800"></i>&nbsp;&nbsp;确定要开放此信息？', function(index){
                    /* obj.del();*/
                    layer.close(index);
                    layer.msg('操作成功');
                    return;
                });
            }
        },
        searchBtn:function(){
            var searchInput = $('#searchInput');
            table.reload('tableId',{
                page:{
                    curr:1 //重新从第一页开始
                },
                where:{
                    id:searchInput.val()
                }
            })
        }
    };
    $('.toolbarAll .layui-btn,#searchBtn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});
    /*告警、策略 页面跳转*/
    $('.page-nav li').click(function(){
    var newLink = $(this).attr('link');
    $('.main-iframe', window.parent.document).attr('src',newLink);

});