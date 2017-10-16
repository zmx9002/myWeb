/**
 * Created by mengxue on 17/8/9.
 */
$(function(){
    FastClick.attach(document.body);
    //轮播图片
    banner();
    function banner(){
        var screenW = $(window).width(); //屏幕宽
        var now = 0; //当前图片索引
        var timer = null; //定时器
        var pageX = 0; //鼠标指针相对于文档的左边缘距离。
        var width = 0; //卷起距离
        var changeX = 0;
        var $dom = $('.pic-list');

        function scroll(){
           width = -now * screenW;
            $dom.css({
                'transform':'translateX(' + width + 'px)',
                'transition':'0.5s'
            });
            $('.pic-mask').find('a').eq(now).addClass('active').siblings().removeClass('active')
        }
        auto();
        function auto(){
            timer = setInterval(function(){
                now++;
                if(now >= $dom.find('li').length){
                    now = 0
                }
                scroll();
            },2000);
        }

        $dom.on('touchstart',function(ev){
            clearInterval(timer);
            $dom.css('transition','none');
            ev = ev.changedTouches[0];
            pageX = ev.pageX;
            changeX = width;
        });

        $dom.on('touchmove',function(ev){
            ev = ev.changedTouches[0];
            var dis = ev.pageX - pageX;
            width = changeX + dis;

            $('.pic-list').css({
                'transform':'translateX('+ width + 'px)'
            });
        });

        $dom.on('touchend',function(){
            now = width/screenW;
            now =-Math.round(now);
            if(now < 0){
                now = 0;
            }
            if(now >= $dom.find('li').length - 1){
                now = $dom.find('li').length -1;
            }
            scroll();
            auto();
        })

    }
});
