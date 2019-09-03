$(function(){
    var liWidth = 180;  //一个节点的长度
    var canvasWidth = 0; //数据总长度
    var elsConWidth = $(".eleCon").width(); //成装数据容器的宽度
    $.ajax({
        type:'get',
        dataType:'json',
        url:'../process.json',
        beforeSend:function(){
            $('.eleCon').html('<div class="dataLoading"><i class="layui-icon layui-icon-loading-1 layui-icon layui-anim layui-anim-rotate layui-anim-loop"></i></div>')
        },
        success:function(data){
            $('.eleCon').html('<div class="canvas"><ul class="processUl"><span class="bgLineL"></span></ul></div>');
            var data = data.data;
            var dataLength = data.length;
            canvasWidth = dataLength*liWidth; //数据总长度,重新赋值
            $('.canvas').css({"width":canvasWidth+"px"});
            for(var i=0;i<dataLength;i++){
                var creLi = '<li class="step" sign="'+data[i].state+'" num="'+(i+1)+'"><span class="bgLineS"></span><span class="round">'+(i+1)+'</span><p class="nameP">'+data[i].title+'</p><label for="" class="explainLabel">'+data[i].explain+'</label></li>';
                $('.processUl').append(creLi);
            };
            if(elsConWidth > canvasWidth){ //不可点击
                $(".nextBtn").addClass("moveBtnDisClick");
            }else{
                $(".nextBtn").addClass("moveBtnClick");
            };
            /*根据标记点显示不同的色*/
            var signEle = $('.processUl').find('.step[sign=1]');
            signEle.find('.nameP').addClass('colorText');
            signEle.find('.round').addClass('colorBlue');
            signEle.prevAll('.step').find('.nameP').addClass('colorText');
            signEle.prevAll('.step').find('.round').addClass('colorBlue');
            var n = signEle.attr('num');
            $(".bgLineL").animate({
                width:n*liWidth+"px"
            },500);
            /*点击元素改变实现步骤*/
            $(".processUl").on("click",".step",function(){
                var num = $(this).attr('num');
                $(".bgLineL").animate({
                    width:num*liWidth+"px"
                },500);
                $(".round").removeClass('colorBlue'); //复原
                $(".nameP").removeClass('colorText');
                $(this).find('.round').addClass('colorBlue');
                $(this).find('.nameP').addClass('colorText');
                $(this).prevAll('.step').find('.nameP').addClass('colorText');
                $(this).prevAll('.step').find('.round').addClass('colorBlue');
            });
        },
        error:function(){
            $('.eleCon').html('<p class="errorNotice">获取数据失败！！！</p>')
        }
    });

    /*用于判断右按钮是否可以点击*/
    var n = 0;
    $(".nextBtn").click(function(){
        var elsConWidth = $(".eleCon").width(); //重新获取盛装数据容器的宽度(预防屏幕宽度改变)
        var canvasWidth = $(".canvas").width(); //获取数据的总宽度
        var canvasLeft = $(".canvas").position().left;
        if(canvasWidth + canvasLeft > elsConWidth){  //右侧还有数据未展示
            $(".forward").removeClass('moveBtnDisClick').addClass("moveBtnClick");//左侧按钮可以点击
            n--;
            $(".canvas").animate({
                left:n*liWidth+"px"
            },200);
        }else{
            $(".nextBtn").removeClass('moveBtnClick').addClass("moveBtnDisClick");//右侧按钮不可以点击
            return;
        };
    });
    $(".forward").click(function() {
        var canvasLeft = $(".canvas").position().left;
        if(canvasLeft < 0){  //左侧还有数据未展示
            $(".nextBtn").removeClass('moveBtnDisClick').addClass("moveBtnClick");//右侧按钮可以点击
            n++;
            $(".canvas").animate({
                left:n*liWidth+"px"
            },200);
        }else{
            $(".forward").removeClass('moveBtnClick').addClass("moveBtnDisClick");//右侧按钮不可以点击
            return;
        };
    });

});