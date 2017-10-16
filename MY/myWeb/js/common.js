$( document ).ready(function() {
    //进度条
    $('.process').circliful();
    // 基于准备好的dom，初始化echarts实例
    var myChartPie = echarts.init(document.getElementById('pie'));
    var myChartAxis = echarts.init(document.getElementById('axis'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {

                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                }
            },
            {
                name:'工作状态',
                type:'pie',
                radius: ['40%', '55%'],

                data:[
                    {
                        value:90,
                        name:'代码编程',
                        itemStyle:{
                            normal:{color:'#4bbbd9'}
                        }
                    },
                    {
                        value:70,
                        name:'网站设计',
                        itemStyle:{
                            normal:{color:'#49b748'}
                        }
                    },
                    {
                        value:80,
                        name:'前后端交互',
                        itemStyle:{
                            normal:{color:'#8c72ec'}
                        }
                    },
                    {
                        value:80,
                        name:'浏览器兼容',
                        itemStyle:{
                            normal:{color:'#f27e52'}
                        }
                    },
                    {
                        value:50,
                        name:'网页特效',
                        itemStyle:{
                            normal:{color:'#ffa33b'}
                        }
                    },
                    {
                        value:20,
                        name:'其他',
                        itemStyle:{
                            normal:{color:'#ffe036'}
                        }
                    }
                ]
            }
        ]
    };
    var option1 = {
        tooltip: {
            trigger: 'axis'
        },
        radar: [
            {
                indicator: [
                    {text: '学习', max: 100},
                    {text: '游戏', max: 100},
                    {text: '追剧', max: 100},
                    {text: '旅游', max: 100},
                    {text: '健身', max: 100},
                    {text: '其它', max: 100}
                ],
                center: ['25%','40%'],
                radius: 80
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
                        color:'#49b748',
                        areaStyle: {color: '#49b748'}
                    }
                },
                data: [
                    {
                        value: [55,65,70,50,10,30],
                        name: '生活状态'
                    }
                ]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartPie.setOption(option);
    myChartAxis.setOption(option1);


var caseBox = $('.case-wrap li');
    caseAnimation(3);
    //案例动画部分
    var now = 0;
    var target;
    var onoff = true;
    setTimeout(function(){
        caseAnimation(now)
    },100);

    //切换事件
    $('.case-wrap li').click(function(){
            if(!onoff){
                return;
            }
            onoff = false;
            target = $(this).index();
            if(target > now){
                if(target - now <= 3){
                    nextAnimation();
                }else{
                    prevAnimation();
                }
            }else if(target < now){
                if(target+7-now <= 3){
                    nextAnimation();
                }else{
                    prevAnimation();
                }
            }else if(target == now){
                caseAnimation(now);
                onoff = true;
            }
        });

        $('.case-wrap li').hover(function(){
            var target = $(this).index();
            if( target == now ){
                $(this).find('.case-describe').css({
                    transform : 'scale(.5) translateY(0px)'
                })
            }
        },function(){
            $(this).find('.case-describe').css({
                transform : 'scale(.5) translateY(220px)'
            })
        });

    //初始化
    function caseAnimation(n){
        for(var i=0; i<3; i++){
            var left = n-1-i;
            if(left < 0){
                left = left + 7;
            }
            caseBox.eq(left).css({
                'transform':"translateX("+(-150*(i+1))+"px) " +
                            "translateZ("+(200-i*100)+"px)"+
                            "rotateY(30deg)"
            });
            var right = n+1+i;
            if(right > 6){
                right = right - 7;
            }
            caseBox.eq(right).css({
                'transform':"translateX("+(150*(i+1))+"px)" +
                            "translateZ("+(200-i*100)+"px)"+
                            "rotateY(-30deg)"
            });
            caseBox.eq(n).css('transform','translateZ(300px)');
        }
    }


    //上一张
    function prevAnimation(){
        now--;
        if(now<0){
            now=6;
        }
        caseAnimation(now);
        if(now == target){
            onoff = true;
            return;
        }
        setTimeout(function(){
            prevAnimation();
        },700)
    }

    //下一张
    function nextAnimation(){
        now++;
        if(now>6){
            now=0;
        }
        caseAnimation(now);
        if(now == target){
            onoff = true;
            return;
        }
        setTimeout(function(){
            nextAnimation();
        },700)
    }

});