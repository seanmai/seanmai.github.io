$(function(){
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        $('.dim').css('opacity',scrollTop/$('.dim').height());
    });
});
