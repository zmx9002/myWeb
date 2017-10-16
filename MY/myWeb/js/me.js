/**
 * Created by mengxue on 17/6/20.
 */
$(function(){
    var $doc = $(document);
    var distance;
    var leftDis = $('.time-box').position().left;
    $('.details-box').find('li').eq(0).show();
    $doc.on('click', '.round', function () {
        var box = $('.time-box');
        var $width = box.find('li').width();
        var detail = $('.details-box');
        var $index = $(this).parents('li').index() - 1;
        $(this).parents('li').addClass('animation').siblings().removeClass('animation');
        distance = (leftDis - (($index+1) * $width)+150) + 'px';
        box.animate({left:distance});
        detail.find('li').eq($index).show().siblings().hide();
    })

});

