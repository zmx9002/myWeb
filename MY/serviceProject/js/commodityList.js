/**
 * Created by mengxue on 17/8/9.
 */
$(function(){
    FastClick.attach(document.body);
    var html = $('#shopList').html();
    var $commodity = true;
    $('#container').html(html);
    $('.change-hide').hide();


    //看商品
    $(document).on('click','.J_change1',function(ev){
        ev.stopPropagation();
        html = $('#commodityList').html();
        $('#container').html(html);
        $(this).hide();
        $('.change-hide').show();
    });

    $(document).on('click','.J_change2',function(ev){
        ev.stopPropagation();
        html = $('#shopList').html();
        $('#container').html(html);
        $('.change-hide').hide();
        $('.J_change1').show();
    });

    $(document).on('click','.J_commodity',function(ev){
        ev.stopPropagation();
        if($commodity){
            $('.commodity-one').addClass('commodity-two').removeClass('commodity-one')
        }else{
            $('.commodity-two').addClass('commodity-one').removeClass('commodity-two')
        }
        $commodity = !$commodity;
    });
});
