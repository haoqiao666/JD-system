/*雷达相关*/
$(function(){
   var outerMostCon = $('.radarCon'); //最外层背景元素
   var radarConWidth = outerMostCon.height(); // 最长直径
   $('.radarCon').css({'width':radarConWidth});
   var maxRatio = 0.35*radarConWidth; //告警点在 $('.radarCon')中最大的半径
   var pointNum = 30; // 允许展现的最多告警个数

    /*雷达适配*/
    $(window).resize(function(){
        radarConWidth =outerMostCon.height(); // 最长直径
        $('.radarCon').css({'width':radarConWidth});
        maxRatio = 0.35*radarConWidth; //告警点在 $('.radarCon')中最大的半径
    });
   $.ajax({
       type:'get',
       url:'../../radar.json',
       dataType:'json',
       success:function(data) {
          var data = data.alarmData;
          var dataLength = data.length;
          for(var i=0;i<dataLength;i++){
             if(i>pointNum){
                return;
             }else{
                 var pointT = random(-maxRatio,maxRatio).toFixed(1)+'px'; //随机高
                 var pointL = random(-maxRatio,maxRatio).toFixed(1)+'px'; //随机left
                 alarmPoint(data[i].alarmName,data[i].grade,data[i].information,pointT,pointL)
             }
          }
       }
   });
   /*随机数*/
    function random(min,max){
        return (Math.random() * (max - min) + min);
    }
    /*告警点结构  所携带信息*/
    function alarmPoint(name,grade,information,pointTop,pointLeft) {
       var crePoint = '<div class="point" name="'+name+'" grade="'+grade+'" information="'+information+'" style="top:'+pointTop+';left:'+pointLeft+'"></div>';
       $('.radar-relative').append(crePoint);
    };

    /*
    * hover 展示结构*/
    function hoverMessage(alarmName,grade,message,hoverT,hoverL){
       var creHover = '<div class="hoverBlock" style="top:'+hoverT+';left:'+hoverL+'"><h4>'+alarmName+'</h4><p>'+message+'</p><p>告警等级：'+grade+'</p></div>';
        $('.radar-relative').append(creHover);
    }
    $('.radar-relative').on('mouseover','.point',function(event){
       /*var hoverT = event.clientY+'px';
       var hoverL = event.clientX+'px';*/
       var hoverT = $(this).css('top');
       var hoverL = $(this).css('left');
       var alarmName = $(this).attr('name');
       var alarmGrade = $(this).attr('grade');
       var alarmMessage = $(this).attr('information');
       hoverMessage(alarmName,alarmGrade,alarmMessage,hoverT,hoverL)
    });
    $('.radar-relative').on('mouseout','.point',function(){
       $('.hoverBlock').remove();
    })
});
