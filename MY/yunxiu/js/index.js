/**
 * Created by mengxue on 17/4/26.
 */
$(function(){
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true,
        onSlideChangeEnd: function(swiper){
            var $page = $('section');
            if(swiper.activeIndex == 0){
                $page.eq(0).addClass('one-page');
            }else{
                $page.eq(0).removeClass('one-page');
            }
            if(swiper.activeIndex == 1){
                $page.eq(1).addClass('two-page');
            }else{
                $page.eq(1).removeClass('two-page');
            }
            if(swiper.activeIndex == 2){
                $page.eq(2).addClass('three-page');
                $('.page1-footer').find('img').hide();
            }else{
                $page.eq(2).removeClass('three-page');
                $('.page1-footer').find('img').show();
            }
        }
    })
});