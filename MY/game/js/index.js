$(function(){
    audioAutoPlay();
    function audioAutoPlay(){
        var audio = document.getElementById('music');
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
        document.addEventListener('YixinJSBridgeReady', function() {
            audio.play();
        }, false);
    }
    FastClick.attach(document.body);
    //设置屏幕高度
    $('body').height($(window).height());
    //入场动画
    setTimeout(function(){
        $('.bg-color1').addClass('section-in')
    },2000);
    changePage();
    //切换场景
    function changePage(){
        var section = $('section');
        var pageDown = 0,pageUp = 0;
        var index = 0;
        //获取手指位置
        $(document).on('touchstart',function(ev){
            ev.preventDefault();
            pageDown = ev.changedTouches[0].pageY;
        });
        //出入场动画
        $(document).on('touchend',function(ev){
            pageUp = ev.changedTouches[0].pageY;
            //向上滑动距离大于50
            if(pageDown - pageUp > 40){
                c(-1)
            }else if( pageDown - pageUp < -40){
                c(1)
            }else{
                return false;
            }

            function c(num){
                if(index == 0 && num == 1){
                    return false;
                }
                if(index == 3 && num == -1){
                    return false;
                }
                if(index == 2){
                    $('.arrow').hide();
                }else{
                    $('.arrow').show();
                }
                section.eq(index).removeClass('section-in').addClass('section-out');
                setTimeout(function(){
                    section.eq(index).hide();
                    section.eq(index - num ).removeClass('section-out').addClass('section-in').show();
                    index = index - num;
                },600);

            }
        });
    }

    //音乐停止
    $(document).on('click','.J_music',function(){
        var music = document.getElementById('music');
        if(music.paused){
            music.play();
            $(this).addClass('music-run').removeClass('music-stop');
        }else{
            music.pause();
            $(this).removeClass('music-run').addClass('music-stop');
        }
    })
});
