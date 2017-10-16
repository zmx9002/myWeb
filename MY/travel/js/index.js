/**
 * Created by mengxue on 17/7/28.
 */
$(function(){
    $('body').height($(window).height());
    load();
    fnTab();
    //入场动画中图片是否加载完成
    function load(){
        setTimeout(function(){
            $('#welcome').css('opacity',0).removeClass('page-show');
            $('.index').addClass('page-show')
        },6000);

        $('#welcome').on('touchend',function(){
            setTimeout(function(){
                $('#welcome').css('opacity',0).removeClass('page-show');
                $('.index').addClass('page-show')
            },1000);
        })
    }

    //轮播图片
    function fnTab(){
        var oList = $('.pic-list');
        var aNav = $('.pic-mask').find('a');
        var iNow = 0;
        var iX = 0;
        var iW = $(window).width();
        var timer = null;
        var startTouchX = 0;
        var startX = 0;
        auto();
        fnScore();
        function tab(){
            iX=-iNow*iW;
            oList.css({
                'transform':'translateX('+ iX + 'px)',
                'transition':'0.5s'
            });
            aNav.each(function(){
                aNav.eq(iNow).addClass('active').siblings().removeClass('active')
            });
        }
        function auto(){
            timer = setInterval(function(){
                iNow++;
                iNow = iNow%aNav.length;
                tab();
            },2000);
        }
        oList.on('touchstart',function(ev){
            oList.css('transition','none');
            ev = ev.changedTouches[0];
            startTouchX = ev.pageX;
            startX = iX;
            clearInterval(timer);
        });

        oList.on('touchmove',function(ev){
            ev = ev.changedTouches[0];
            var dis = ev.pageX - startTouchX;
            iX = startX + dis;
            oList.css({
                'transform':'translateX('+ iX + 'px)'
            });
        });

        oList.on('touchend',function(){
            iNow = iX/iW;
            iNow =-Math.round(iNow);
            if(iNow < 0){
                iNow = 0;
            }
            if(iNow >= aNav.length - 1){
                iNow = aNav.length -1;
            }
            tab();
            auto();
        })

    }
    //评分
    function fnScore(){
        var scoreList = $('.score').find('li');
        var arrText = ['好失望','没有想象的差','很一般','良好','棒极了'];
        scoreList.each(function(){
            var nav = $(this).find('a');
            var text = $(this).find('input');
            nav.on('touchstart',function(){
               var prents = $(this).parents('li');
               for(var i=0; i<nav.length;i++){
                   if( i < $(this).index()+1){
                       prents.find('a').eq(i).addClass('active');
                   }else{
                       prents.find('a').eq(i).removeClass('active');
                   }
                   text.val(arrText[$(this).index()]);
               }
           })
        });
        fnIndex();
    }
    //显示标签
    function info(info,text){
        info.text(text);
        info.css({
            'webkit-transform':'scale(1)',
            'transform':'scale(1)',
            'opacity':'1'
        });
        setTimeout(function(){
            info.css({
                'webkit-transform':'scale(0.4)',
                'transform':'scale(0.4)',
                'opacity':'0'
            });
        },1000)
    }
    //点击提交判断是否给景区添加标签和评分
    function fnIndex(){
        var btn = $('.index').find('.btn');
        var infoDom  = $('.index').find('.info');
        var scoreFlag = false;
        var tagFlag = false;
        btn.on('touchend',function(){
            scoreFlag = getSelectScore();
            tagFlag = tags();
            if(scoreFlag){
                if(tagFlag){
                    fnIndexOut();
                }else{
                    info(infoDom,'给景区添加标签');
                }
            }else{
                info(infoDom,'给景区评分');
            }
        });

        //获取是否全部评分
        function getSelectScore(){
            var scoreInput = $('.score').find('input');
           for(var i=0; i<scoreInput.length; i++){
                if(scoreInput.eq(i).val() == 0){
                    return false;
                }
            }
            return true;
        }
        //获取是否添加标签
        function tags(){
            var scoreTages = $('.index-tags').find('input');
            for(var i=0; i<scoreTages.length; i++){
                if(scoreTages.eq(i).is(':checked')){
                    return true;
                }
            }
            return false;
        }
    }
    //评价成功并跳转到新闻
    function fnIndexOut(){
        $('.mask').addClass('page-show');
        setTimeout(function(){
            $('.mask').css({'opacity':1});
            $('.index').css({
                '-webkit-filter':'blur(2px)',
                'filter':'blur(2px)'
            })
        },15);
        setTimeout(function(){
            $('.mask').css({'opacity':0});
            $('.index').css({
                '-webkit-filter':'blur(0px)',
                'filter':'blur(0px)'
            });
            $('.index').removeClass('page-show');
            $('.mask').removeClass('page-show');
            $('.news').addClass('page-show').css('opacity',1);
        },3000)
    };

    //新闻
    news();
    function news(){
        var news = $('.news').find('input');
        var infoTex = $('.news').find('.info');
        news.eq(0).on('change',function(){
            var type = $(this)[0].files[0].type.split("/")[0];
           if(type == 'video'){
               newsOut();
               $(this).val('');
           }else{
               info(infoTex,'请上传视频文件')
           }
        });

        news.eq(1).on('change',function(){
            var type = $(this)[0].files[0].type.split("/")[0];
            if(type == 'image'){
                newsOut();
                $(this).val('');
            }else{
                info(infoTex,'请上传图片文件')
            }
        })
    }
    //从新闻页面跳出
    function newsOut(){
        $('.news').removeClass('page-show');
        $('.form').addClass('page-show');
        formIn();
    }
    //表单提交
    function formIn(){
        var form = $('.form-tags').find('label');
        var btn = $('.form').find('.btn');
        var infoText = $('.form').find('.info');
        var flag = false;
        form.each(function(){
            form.on('touchend',function(){
                flag = true;
                btn.addClass('submit');
            })
        });
        btn.on('touchend',function(){
            if(flag){
                var phone = $('.phone').val();
                if(phone !=''){
                    var reg = /^1[34578]\d{9}$/;
                    if( !reg.test(phone)){
                        info(infoText,'电话号码有误');
                        return false;
                    }
                }
                $('.form-tags').find('input').prop('checked',false);
                flag = false;
                $('.over').addClass('page-show');
                $('.form').removeClass('page-show');
                over();
            }
        })
    }

    function over(){
        var btn = $('.over').find('.btn');
        btn.on('touchend',function(){
            $('.over').removeClass('page-show');
            $('.index').addClass('page-show');
        });
    }

});
