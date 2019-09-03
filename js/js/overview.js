/*ec 图*/
$(function () {
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];
    var data = [Math.random() * 300];
    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    var colorArr = ['#7b5fff', '#4984fe', '#0ce0fa', '#36efb9', '#89e784'];
    var ecColor = ['#b3b1b1'];
    /*ec图坐标轴线上文字颜色*/
    var ecSize = ['10'];
    /*ec图坐标轴上文字大小*/
    var ecBgColor = ['#0ce0fa', '#4984fe', '#7b5fff'];
    /*ec图中面积背景色*/
    var ecBarWidth = ['8', '10'];
    /*ec中柱状图的宽度*/
    var ecTitleStyle = ['12', '#dedfe1', '500']


    var dataAnalysisChart = echarts.init(document.getElementById('data_analysis'), 'dark');
    var urlIpChart = echarts.init(document.getElementById('url_ip'), 'dark');
    var sensitiveMessageChart = echarts.init(document.getElementById('sensitive_message'), 'dark');
    var flowStateChart = echarts.init(document.getElementById('flow_state'), 'dark');
    var monitorNumChart = echarts.init(document.getElementById('monitor_num'), 'dark');
    var funnelChart = echarts.init(document.getElementById('funnel'), 'dark');
    var alarmTrendMChart = echarts.init(document.getElementById('alarm_trendM'), 'dark');
    var alarmCategoryChart = echarts.init(document.getElementById('alarm_category'), 'dark');
    var alarmLevelChart = echarts.init(document.getElementById('alarm_level'), 'dark');
    var alarmShipChart = echarts.init(document.getElementById('alarm_ship'), 'dark');
    var alarmTrendChart = echarts.init(document.getElementById('alarm_trend'), 'dark');
    /*数据分析*/
    dataAnalysisOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
            text: '数据分析',
            textStyle: {
                fontSize: ecTitleStyle[0],
                color: ecTitleStyle[1],
                fontWeight: ecTitleStyle[2]
            },
        },
        color: ecBgColor,
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            top: '20%',
            left: '1%',
            right: '4%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                boundaryGap: true,
                axisLine: {
                    /*坐标轴轴线设置*/
                    show: true,
                    lineStyle: {
                        color: ecColor[0]
                    }
                },
                axisTick: {
                    /*坐标轴刻度*/
                    show: true
                },
                axisLabel: {
                    /*坐标轴刻度标签*/
                    show: true,
                    rotate: 36,
                    textStyle: {
                        fontWeight: '100',
                        color: ecColor[0],
                        fontSize: ecSize[0]
                    }
                },
                splitLine: {
                    /*坐标轴在grid区域中的分割线*/
                    show: false
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                boundaryGap: false,
                axisLine: {
                    /*坐标轴轴线设置*/
                    show: true,
                    lineStyle: {
                        color: ecColor[0]
                    }
                },
                axisTick: {
                    /*坐标轴刻度*/
                    show: true
                },
                axisLabel: {
                    /*坐标轴刻度标签*/
                    show: true,
                    rotate: 36,
                    textStyle: {
                        fontWeight: '100',
                        color: ecColor[0],
                        fontSize: ecSize[0]
                    }
                },
                splitLine: {
                    /*坐标轴在grid区域中的分割线*/
                    show: false
                },
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: 10,
                data: []
            },
            {
                name: '',
                type: 'bar',
                barWidth: 10,
                data: []
            }
        ]
    };
    /*URL占比  源IP*/
    urlIpOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        graphic: {
            elements: [{
                type: 'text',
                style: {
                    text: 'URL占比',
                    font: '500  14px',
                    textAlign: 'center',
                    fill: '#dedfe1'
                },
                left: '18%',
                top: '44%'
            },
                {
                    type: 'text',
                    style: {
                        text: '源IP',
                        font: '500  14px',
                        textAlign: 'center',
                        fill: '#dedfe1',
                    },
                    left: '72%',
                    top: '44%'
                }
            ]
        },
        series: [
            {
                name: 'URL占比',
                type: 'pie',
                color: ['#0289d5', '#1ec0ff', '#56646f'],
                radius: ['45%', '70%'],
                center: ['25%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },

                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                   /* {value: 335, name: '直接访问'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}*/
                ]
            },
            {
                name: '源Ip',
                type: 'pie',
                color: ['#ff563f', '#7c69d4', '#56646f'],
                radius: ['45%', '70%'],
                center: ['75%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    /*{value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'}*/
                ]
            }
        ]
    };
    /*敏感信息top*/
    sensitiveMessageOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
            text: '敏感信息TOP',
            textStyle: {
                fontSize: ecTitleStyle[0],
                color: ecTitleStyle[1],
                fontWeight: ecTitleStyle[2]
            },

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '20%',
            left: '1%',
            right: '4%',
            bottom: '-2%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLine: {
                /*坐标轴轴线设置*/
                show: true,
                lineStyle: {
                    color: ecColor[0]
                }
            },
            axisTick: {
                /*坐标轴刻度*/
                show: true
            },
            axisLabel: {
                /*坐标轴刻度标签*/
                show: true,
                rotate: 36,
                textStyle: {
                    fontWeight: '100',
                    color: ecColor[0],
                    fontSize: ecSize[0]
                }
            },
            splitLine: {
                /*坐标轴在grid区域中的分割线*/
                show: false
            },
        },
        yAxis: {
            type: 'category',
            data: [],
            axisLine: {
                /*坐标轴轴线设置*/
                show: true,
                lineStyle: {
                    color: ecColor[0]
                }
            },
            axisTick: {
                /*坐标轴刻度*/
                show: true
            },
            axisLabel: {
                /*坐标轴刻度标签*/
                show: true,
                rotate: 36,
                textStyle: {
                    fontWeight: '100',
                    color: ecColor[0],
                    fontSize: ecSize[0]
                }
            },
            splitLine: {
                /*坐标轴在grid区域中的分割线*/
                show: false
            },
        },
        series: [
            {
                name: '敏感信息',
                data: [],
                type: 'bar',
                barWidth: 6,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#1e97e4'},
                                {offset: 1, color: '#88e684'}
                            ]
                        )
                    }
                }
            }
        ]
    };
    /*流量状态*/
    flowStateOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
            text: '数据分析',
            textStyle: {
                fontSize: ecTitleStyle[0],
                color: ecTitleStyle[1],
                fontWeight: ecTitleStyle[2]
            },
        },
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        grid: {
            top: '20%',
            left: '1%',
            right: '4%',
            bottom: '-2%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                /*坐标轴轴线设置*/
                show: true,
                lineStyle: {
                    color: ecColor[0]
                }
            },
            axisTick: {
                /*坐标轴刻度*/
                show: true
            },
            axisLabel: {
                /*坐标轴刻度标签*/
                show: true,
                rotate: 36,
                textStyle: {
                    fontWeight: '100',
                    color: ecColor[0],
                    fontSize: ecSize[0]
                }
            },
            splitLine: {
                /*坐标轴在grid区域中的分割线*/
                show: false
            },
            data: []
        },
        yAxis: {
            type: 'value',
            axisLine: {
                /*坐标轴轴线设置*/
                show: true,
                lineStyle: {
                    color: ecColor[0]
                }
            },
            axisTick: {
                /*坐标轴刻度*/
                show: true
            },
            axisLabel: {
                /*坐标轴刻度标签*/
                show: true,
                rotate: 36,
                textStyle: {
                    fontWeight: '100',
                    color: ecColor[0],
                    fontSize: ecSize[0]
                }
            },
            splitLine: {
                /*坐标轴在grid区域中的分割线*/
                show: false
            },
            boundaryGap: [0, '100%']
        },
        series: [
            {
                name: '模拟数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: '#4388fe',
                    }
                },
                lineStyle: {
                    normal: {
                        width: 0.5
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#4388fe'
                    }
                },
                data: []
            }
        ]
    };
    /*监测个数*/
    monitorNumOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
            text: '监测个数',
            textStyle: {
                fontSize: ecTitleStyle[0],
                color: ecTitleStyle[1],
                fontWeight: ecTitleStyle[2]
            },
        },
        grid: {
            top: '20%',
            left: '1%',
            right: '4%',
            bottom: '-2%',
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        xAxis: [
            {
                type: 'category',
                data: [/*'周一','周二','周三','周四','周五'*/],
                axisLine: {
                    /*坐标轴轴线设置*/
                    show: true,
                    lineStyle: {
                        color: ecColor[0]
                    }
                },
                axisTick: {
                    /*坐标轴刻度*/
                    show: true
                },
                axisLabel: {
                    /*坐标轴刻度标签*/
                    show: true,
                    rotate: 36,
                    textStyle: {
                        fontWeight: '100',
                        color: ecColor[0],
                        fontSize: ecSize[0]
                    }
                },
                splitLine: {
                    /*坐标轴在grid区域中的分割线*/
                    show: false
                },
            }
        ],
        yAxis: {
            type: 'value',
            axisLine: {
                /*坐标轴轴线设置*/
                show: true,
                lineStyle: {
                    color: ecColor[0]
                }
            },
            axisTick: {
                /*坐标轴刻度*/
                show: true
            },
            axisLabel: {
                /*坐标轴刻度标签*/
                show: true,
                rotate: 36,
                textStyle: {
                    fontWeight: '100',
                    color: ecColor[0],
                    fontSize: ecSize[0]
                }
            },
            splitLine: {
                /*坐标轴在grid区域中的分割线*/
                show: false
            },
        },
        series: [
            {
                name: '工单审批系统',
                type: 'bar',
                barWidth: 6,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#38f3f7'},
                                {offset: 1, color: '#4e6ee7'}
                            ]
                        )
                    }
                },
                data: [/*120, 132, 101, 134, 90*/]
            }
        ]
    };
    /*漏斗图*/
    funnelOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                color: ['#7b5fff', '#4984fe', '#0ce0fa', '#36efb9', '#89e784'],
                width: '60%',
                height: '66%',
                left: '20%',
                top: '18%',
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    /*{value: 60, name: '访问'},
                    {value: 30, name: '咨询'},
                    {value: 10, name: '订单'},
                    {value: 80, name: '点击'},
                    {value: 100, name: '展现'}*/
                ]
            },
        ]
    };
    /*告警趋势*/
    alarmTrendMOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
            text: '告警趋势',
            textStyle: {
                fontSize: ecTitleStyle[0],
                color: ecTitleStyle[1],
                fontWeight: ecTitleStyle[2]
            },
        },
        tooltip: {
            trigger: 'axis',

            axisPointer: {
                type: 'shadow',
            }
        },
        grid: {
            top: '20%',
            left: '1%',
            right: '4%',
            bottom: '-2%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLine: {
                    /*坐标轴轴线设置*/
                    show: true,
                    lineStyle: {
                        color: ecColor[0]
                    }
                },
                axisTick: {
                    /*坐标轴刻度*/
                    show: true
                },
                axisLabel: {
                    /*坐标轴刻度标签*/
                    show: true,
                    rotate: 36,
                    textStyle: {
                        fontWeight: '100',
                        color: ecColor[0],
                        fontSize: ecSize[0]
                    }
                },
                splitLine: {
                    /*坐标轴在grid区域中的分割线*/
                    show: false
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    /*坐标轴轴线设置*/
                    show: true,
                    lineStyle: {
                        color: ecColor[0]
                    }
                },
                axisTick: {
                    /*坐标轴刻度*/
                    show: true
                },
                axisLabel: {
                    /*坐标轴刻度标签*/
                    show: true,
                    rotate: 36,
                    textStyle: {
                        fontWeight: '100',
                        color: ecColor[0],
                        fontSize: ecSize[0]
                    }
                },
                splitLine: {
                    /*坐标轴在grid区域中的分割线*/
                    show: false
                },
            }
        ],
        series: [
            {
                name: '邮件营销',
                type: 'line',
                areaStyle: {
                    color: '#7b5fff'
                },
                itemStyle: {
                    normal: {
                        color: '#7b5fff',
                    }
                },
                data: []
            },
            {
                name: '联盟广告',
                type: 'line',
                areaStyle: {
                    color: '#4984fe'
                },
                itemStyle: {
                    normal: {
                        color: '#4984fe',
                    }
                },
                data: []
            },
            {
                name: '搜索引擎',
                type: 'line',
                areaStyle: {
                    color: '#0ce0fa'
                },
                itemStyle: {
                    normal: {
                        color: '#0ce0fa',
                    }
                },
                data: []
            }
        ]
    };
    /*告警类别分布*/
    alarmCategoryOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
            text: '告警类别分布',
            textStyle: {
                fontSize: ecTitleStyle[0],
                color: ecTitleStyle[1],
                fontWeight: ecTitleStyle[2]
            },
        },
        tooltip: {
            trigger: 'axis',
        },
        radar: [
            {
                indicator: [
                ],
                radius: '64%',
                center: ['45%', '55%'],
                shape: 'circle',
                /*name: {
                    color: 'rgba(0,0,0,0)'
                },*/
                splitLine: {
                    lineStyle: {
                        color: [
                            '#42475e', '#0f1635',
                        ].reverse()
                    }
                },
                splitArea: {
                    show: false
                },
                /*axisLine: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#3a0549' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#662b20' // 100% 处的颜色
                            }],
                        }
                    }
                }*/
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                },
            },
        ],
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default',
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,
                                [
                                    {offset: 0, color: '#8a5dff'},
                                    {offset: 1, color: '#60d5ff'}
                                ]
                            )
                        },
                        lineStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,
                                [
                                    {offset: 0, color: '#8a5dff'},
                                    {offset: 1, color: '#60d5ff'}
                                ]
                            )
                        }
                    }
                },
                data: [
                    {
                        value: [],
                        name: '某系统'
                    }
                ]
            },
        ]
    };
    /*告警级别分布*/
    alarmLevelOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
            text: '告警级别分布',
            textStyle: {
                fontSize: ecTitleStyle[0],
                color: ecTitleStyle[1],
                fontWeight: ecTitleStyle[2]
            },
        },
        color: [
            'rgba(181,40,42,.8)', 'rgba(243,152,0,.8)', 'rgba(255,255,0,.8)'
        ],
        grid: {
            top: '22%',
            left: '1%',
            right: '4%',
            bottom: '-4%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四'],
            axisLine: {
                /*坐标轴轴线设置*/
                show: true,
                lineStyle: {
                    color: ecColor[0]
                }
            },
            axisTick: {
                /*坐标轴刻度*/
                show: true
            },
            axisLabel: {
                /*坐标轴刻度标签*/
                show: true,
                rotate: 36,
                textStyle: {
                    fontWeight: '100',
                    color: ecColor[0],
                    fontSize: ecSize[0]
                }
            },
            splitLine: {
                /*坐标轴在grid区域中的分割线*/
                show: false
            },
        },
        yAxis: {
            axisLine: {
                /*坐标轴轴线设置*/
                show: true,
                lineStyle: {
                    color: ecColor[0]
                }
            },
            axisTick: {
                /*坐标轴刻度*/
                show: true
            },
            axisLabel: {
                /*坐标轴刻度标签*/
                show: true,
                rotate: 36,
                textStyle: {
                    fontWeight: '100',
                    color: ecColor[0],
                    fontSize: ecSize[0]
                }
            },
            splitLine: {
                /*坐标轴在grid区域中的分割线*/
                show: false
            },
        },
        series: [{
            name: '高',
            symbolSize: 18,
            data: [],
            type: 'scatter',
        },
            {
                name: '中',
                symbolSize: 12,
                data: [],
                type: 'scatter',
            },
            {
                name: '低',
                symbolSize: 6,
                data: [],
                type: 'scatter',
            }]
    };
    /*告警事件关系*/
    alarmShipOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        legend: {
            x: "center",
            show: true,
            data: [] // 此处不显示根节点学生
        },
        series: [

            {
                type: 'graph',
                layout: 'force',
                symbolSize: function (size) {
                    return size;
                }, edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 10
                        },
                        formatter: "{c}"
                    }
                },
                force: {
                    repulsion: 2500,
                    edgeLength: [10, 50]
                },
                focusNodeAdjacency: true,
                roam: true,
                categories: [{
                    name: '用户',

                }, {
                    name: '测试',

                }, {
                    name: '运维',
                }, {
                    name: '测试',
                }],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                    }
                },
                force: {
                    repulsion: 500
                },
                tooltip: {
                    formatter: function (node) { // 区分连线和节点，节点上额外显示其他数字
                        if (!node.value) {
                            return node.data.name;
                        } else {
                            return node.data.name + ":" + node.data.showNum;
                        }
                    },
                },
                lineStyle: {
                    normal: {
                        color: '#384355',
                        opacity: 0.9,
                        width: 1,
                        curveness: 0.3
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#009bef',
                    }

                },
                data: [{
                    name: '网友_1',
                    draggable: true, // 是否可以拖拽，默认false
                    category: 0, // 这是种类，对应上面的categories下标
                    value: 10, //图形大小
                    showNum: '这是什么鬼' //hover浮点需要显示的额外内容
                }, {
                    name: '话题_2',
                    category: 1,
                    draggable: true,
                    value: 40,
                    showNum: 35
                }, {
                    name: '话题_3',

                    category: 2,
                    draggable: true,
                    value: 45,
                    showNum: 35
                }, {
                    name: '话题_4',

                    category: 3,
                    draggable: true,
                    value: 45,
                    showNum: 35
                }],
                links: [{
                    source: 0, // 谁与谁连，开始节点即data中元素下标
                    target: 1,// 谁与谁连，结束节点即data中元素下标
                    value: '转发'
                }, {
                    source: 2,
                    target: 3,
                    value: '发布'
                }]
            }
        ]
    };
    /*告警等级趋势*/
    alarmTrendOption = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '28%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                ]
            },
            {
                name: '访问来源',
                type: 'pie',
                radius: ['38%', '56%'],
                label: {
                    normal: {
                        /*show:false*/
                        formatter: '{a|{a}}{abg|}\n{hr|}\n {b|{b}：}{c} {per|{d}%}  ',
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        shadowBlur: 3,
                        shadowOffsetX: 2,
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 20,
                                align: 'center'
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 12,
                                lineHeight: 20
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 2],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data: [
                ]
            }
        ]
    };
});
/*数据请求*/
$(function () {
    dataAnalysis();
     urlIp();
    sensitiveMessage();
    flowState();
    monitorNum();
    funnel();
    alarmTrendM();
    alarmCategory();
    alarmLevel();
    alarmShip();
    alarmTrend()

    /*数据分析*/
    function dataAnalysis() {
        var dataAnalysisChart = echarts.init(document.getElementById('data_analysis'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            dataType: 'json',
            beforeSend: function () {
                dataAnalysisChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            success: function (data) {
                dataAnalysisChart.hideLoading();
                dataAnalysisOption.xAxis[0].data = ['1', '2', '3', '4', '5'];
                var dataArr = data.data0;
                if (dataArr.length > 0) {
                    for (var i = 0; i < dataArr.length; i++) {
                        dataAnalysisOption.series[i].name = dataArr[i].name;
                        dataAnalysisOption.series[i].type = dataArr[i].type;
                        dataAnalysisOption.series[i].data = dataArr[i].data;
                    }
                    /*window.onresize = dataAnalysisChart.resize;*/
                    $(window).resize(function(){
                        dataAnalysisChart.resize();
                    });
                    dataAnalysisChart.setOption(dataAnalysisOption);
                } else {
                    $('#data_analysis').html("<div class='jd-no-data'>暂无数据1!</div>");
                }
            },
            error: function () {
                dataAnalysisChart.hideLoading();
                $('#data_analysis').html("<div class='jd-no-data'>暂无数据2!</div>");
            }
        });
    }

    /*url请求*/
    function urlIp() {
        var urlIpChart = echarts.init(document.getElementById('url_ip'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                urlIpChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                urlIpChart.hideLoading();
                var dataArr = result.data1;
                if (dataArr.length > 0) {
                    /!*urlIpOption.series[0].color = ['#0289d5','#1ec0ff','#56646f'];*!/
                    urlIpOption.series[0].data = [
                        {value: 335, name: '直接访问'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ];
                    /!*urlIpOption.series[1].color = ['#ff563f','#7c69d4','#56646f'];*!/
                    urlIpOption.series[1].data = [
                        {value: 335, name: '直接访问'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ];
                   /* window.onresize = urlIpChart.resize;*/
                    $(window).resize(function(){
                        urlIpChart.resize;
                    });
                    urlIpChart.setOption(urlIpOption);
                } else {
                    $('#url_ip').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                urlIpChart.hideLoading();
                $('#url_ip').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }

    /*敏感信息top*/
    function sensitiveMessage() {
        var sensitiveMessageChart = echarts.init(document.getElementById('sensitive_message'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                sensitiveMessageChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                sensitiveMessageChart.hideLoading();
                sensitiveMessageOption.yAxis.data = ['周一', '周二', '周三', '周四', '周五'];
                var dataArr = result.data0;
                if (dataArr.length > 0) {
                    sensitiveMessageOption.series[0].data = [820, 932, 901, 934, 1029];
                    $(window).resize(function(){
                        sensitiveMessageChart.resize();
                    })
                    sensitiveMessageChart.setOption(sensitiveMessageOption);
                } else {
                    $('#sensitive_message').html("<div class='jd-no-data'>暂无数据1!</div>");
                }
            }, error: function () {
                sensitiveMessageChart.hideLoading();
                $('#sensitive_message').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }

    /*流量状态*/
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];
    var data = [Math.random() * 300];
    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    function flowState() {
        var flowStateChart = echarts.init(document.getElementById('flow_state'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                flowStateChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                flowStateChart.hideLoading();
                var dataArr = result.data0;
                flowStateOption.xAxis.data = date;
                if (dataArr.length > 0) {
                    flowStateOption.series[0].data = data;
                    window.onresize = flowStateChart.resize;
                    $(window).resize(function(){
                        flowStateChart.resize();
                    })
                    flowStateChart.setOption(flowStateOption);
                } else {
                    $('#flow_state').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                flowStateChart.hideLoading();
                $('#flow_state').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }
    /*监测个数*/
    function monitorNum() {
        var monitorNumChart = echarts.init(document.getElementById('monitor_num'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                monitorNumChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                monitorNumChart.hideLoading();
                var dataArr = result.data0;
                if (dataArr.length > 0) {
                    monitorNumOption.xAxis[0].data = ['周一', '周二', '周三', '周四', '周五'];
                    monitorNumOption.series[0].data = [120, 132, 101, 134, 90];
                    $(window).resize(function(){
                        monitorNumChart.resize();
                    });
                    monitorNumChart.setOption(monitorNumOption);
                } else {
                    $('#monitor_num').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                monitorNumChart.hideLoading();
                $('#monitor_num').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }

    /*漏斗图*/
    function funnel() {
        var funnelChart = echarts.init(document.getElementById('funnel'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                funnelChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                funnelChart.hideLoading();
                var dataArr = result.data0;
                if (dataArr.length > 0) {
                    funnelOption.series[0].data = [
                        {value: 60, name: '访问'},
                        {value: 30, name: '咨询'},
                        {value: 10, name: '订单'},
                        {value: 80, name: '点击'},
                        {value: 100, name: '展现'}];
                    $(window).resize(function(){
                        funnelChart.resize();
                    });
                    funnelChart.setOption(funnelOption);
                } else {
                    $('#funnel').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                funnelChart.hideLoading();
                $('#funnel').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }

    /*告警趋势*/
    function alarmTrendM() {
        var alarmTrendMChart = echarts.init(document.getElementById('alarm_trendM'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                alarmTrendMChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                alarmTrendMChart.hideLoading();
                alarmTrendMOption.xAxis[0].data = ['周一', '周二', '周三', '周四', '周五'];
                var dataArr = result.data0;
                if (dataArr.length > 0) {
                    alarmTrendMOption.series[0].data = [8, 5, 4, 3, 5];
                    alarmTrendMOption.series[1].data = [2, 1, 9, 5, 1];
                    alarmTrendMOption.series[2].data = [3, 5, 2, 6, 6];
                    $(window).resize(function(){
                        alarmTrendMChart.resize();
                    });
                    alarmTrendMChart.setOption(alarmTrendMOption);
                } else {
                    $('#alarm_trendM').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                alarmTrendMChart.hideLoading();
                $('#alarm_trendM').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }

    /*告警类别*/
    function alarmCategory() {
        var alarmCategoryChart = echarts.init(document.getElementById('alarm_category'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                alarmCategoryChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                alarmCategoryChart.hideLoading();
                alarmCategoryOption.radar[0].indicator = [{text: '类别1'},
                    {text: '类别2'},
                    {text: '类别3'},
                    {text: '类别4'}];
                var dataArr = result.data0;
                if (dataArr.length > 0) {
                    alarmCategoryOption.series[0].data[0].value = [50,40, 67, 84];
                    $(window).resize(function(){
                        alarmCategoryChart.resize();
                    });
                   /* window.onresize = alarmCategoryChart.resize;*/
                    alarmCategoryChart.setOption(alarmCategoryOption);
                } else {
                    $('#alarm_category').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                alarmCategoryChart.hideLoading();
                $('#alarm_category').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }

    /*告警级别*/
    function alarmLevel() {
        var alarmLevelChart = echarts.init(document.getElementById('alarm_level'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                alarmLevelChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                alarmLevelChart.hideLoading();
                var dataArr = result.data0;
                if (dataArr.length > 0) {
                    alarmLevelOption.series[0].data = [5, 9, 1, 6];
                    alarmLevelOption.series[1].data = [1, 4, 7, 9];
                    alarmLevelOption.series[2].data = [7, 2, 2, 7];
                    $(window).resize(function(){
                        alarmLevelChart.resize();
                    });
                    alarmLevelChart.setOption(alarmLevelOption);
                } else {
                    $('#alarm_level').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                alarmLevelChart.hideLoading();
                $('#alarm_level').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }

    /*告警事件*/
    function alarmShip() {
        var alarmShipChart = echarts.init(document.getElementById('alarm_ship'), 'dark');
        $.ajax({
            type: 'GET',
            url: '<%=appContext%>/common/business_alarm_chart?t=',
            beforeSend: function () {
                alarmShipChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                alarmShipChart.hideLoading();
                var dataArr = result.data;
                alarmShipOption.legend.data = ['招标倾向性', '装饰装修项目', '房建项目', '园林绿化项目', '其他项目', '市政项目', '园林绿化项目'];
                if (dataArr.length > 0) {
                    alarmShipOption.series[0].data = result.data;
                    alarmShipOption.series[0].categories = result.categories;
                    alarmShipOption.series[0].links = result.links;
                    window.onresize = alarmShipChart.resize;
                    alarmShipChart.setOption(alarmShipOption);
                } else {
                    $('#alarm_ship').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                alarmShipChart.hideLoading();
                $('#alarm_ship').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }

    /*告警等级趋势*/
    function alarmTrend() {
        var alarmTrendChart = echarts.init(document.getElementById('alarm_trend'), 'dark');
        $.ajax({
            type: 'GET',
            url: '../../overEc.json',
            beforeSend: function () {
                alarmTrendChart.showLoading({
                    text: '数据获取中...',
                    color: '#0c213d',
                    textColor: '#2dcddf',
                    maskColor: 'rgba(0, 0, 0, 0.2)',
                    zlevel: 0
                });
            },
            dataType: 'json',
            success: function (result) {
                alarmTrendChart.hideLoading();
                var dataArr = result.data0;
                if (dataArr.length > 0) {
                    alarmTrendOption.series[0].data = [{value: 335, name: '高'},
                                                        {value: 679, name: '中'},
                                                        {value: 1548, name: '低'}];

                    alarmTrendOption.series[1].data = [{value: 148, name: '百度'},
                        {value: 251, name: '谷歌'},
                        {value: 147, name: '必应'},
                        {value: 102, name: '其他'}];
                    window.onresize = alarmTrendChart.resize;
                    alarmTrendChart.setOption(alarmTrendOption);
                } else {
                    $('#alarm_trend').html("<div class='jd-no-data'>暂无数据!</div>");
                }
            }, error: function () {
                alarmTrendChart.hideLoading();
                $('#alarm_trend').html("<div class='jd-no-data'>暂无数据!</div>");
            }
        });
    }
});


/*业务告警 表格*/
$(function () {
    function busTable(time, num, sys, ip, modul, grade, message) {
        var tabObj = "<li>" +
            "<label for='' class='liBg'></label>" +
            "<span class='headTime'>" + time + "</span>" +
            "<span class='headNum'>" + num + "</span>" +
            "<span class='headSys'>" + sys + "</span>" +
            "<span class='headIp'>" + ip + "</span>" +
            "<span class='headModul'>" + modul + "</span>" +
            "<span class='headGrade'>" + grade + "</span>" +
            "<span class='headMessage'>" + message + "</span>" +
            "</li>"
        $('.contentFill').append(tabObj)
    }

    var dataTableLength = 0;
    var bodyLi = 26 // 与css保持一致
    function changetabody(dataTableLength){
        var fixedHeight = $('.moveTabBody').height();
        if(dataTableLength*bodyLi > fixedHeight){
            $('.tableBodyCon').append($('.contentFill').clone());
        }else {
            clearInterval(timer);
            return;
        }
    }

    $.ajax({
        type: 'GET',
        url: '../../overviewTable.json',
        dataType: 'json',
        success: function (data) {
            var dataTable = data.tableBody;
            dataTableLength = data.tableBody.length;
            for (var n = 0; n < dataTableLength; n++) {
                busTable(dataTable[n].time, dataTable[n].num, dataTable[n].sys, dataTable[n].ip, dataTable[n].modul, dataTable[n].grade, dataTable[n].message)
            }
            changetabody(dataTableLength);
            /*$('.tableBodyCon').append($('.contentFill').clone())*/
        }
    })
    var t = 0;
    function autoplay() {
        t--;
        if (t < dataTableLength * (-26)) {
            t = 0
        }
        $('.tableBodyCon').css({'top': t + 'px'});
    }
    var timer = setInterval(autoplay, 100);
    $('.moveTabBody').mouseover(function () {
        clearInterval(timer);
    });
    $('.moveTabBody').mouseleave(function () {
        timer = setInterval(autoplay, 100);
    });


})
/*重点关注告警*/
$(function () {
    /*监听窗口*/

    var containHeight = $('.roll-screen').height(); //容器的高度
    scroll(containHeight)

    function scroll(containHeight) {
        var pHeight = 22  //与css中保持一致;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '../../roll.json',
            success: function (data) {
                var data = data.data;
                dataLength = data.length;
                if (data != '' && data != null) {
                    for (var n = 0; n < data.length; n++) {
                        var pCon = '<p title="' + data[n].message + '">' + data[n].message + '</p>';
                        $('.messageCon').append(pCon);
                    }
                    if (containHeight < dataLength * pHeight) {  //滚动
                        $('.screenCon').append($('.messageCon').clone());
                        setInterval(autoplay1, 2000);
                    }
                } else {
                    $('.messageCon').html('<div class="no-data">暂无数据！</div>')
                }
            }, error: function () {
                $('.messageCon').html('<div class="no-data">暂无数据！</div>');
            }
        });
        /*回溯轮播*/
        var i = 0;

        function autoplay1() {
            i--;
            if (i <= (-dataLength)) {
                i = 0;
            }
            $('.screenCon').css({'top': i * pHeight + 'px'})
        }
    }

    /*$(window).resize(function () {
        containHeight = $('.roll-screen').height(); //容器的高度
        scroll(containHeight)
    });*/
});
