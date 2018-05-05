$(".about-me").on("click", function() {
    $(this).toggleClass("expand");
    $(this).toggleClass("col-lg-6");
    setTimeout(function () {
        if($(".about-content").css("visibility")!="hidden"){
            $(".about-content").css({"visibility": "hidden", "opacity": "0"});
            $(".about-me-expanded").css({"visibility": "visible", "opacity": "1"});
        } else{
            $(".about-content").css({"visibility": "visible", "opacity": "1"});
            $(".about-me-expanded").css({"visibility": "hidden", "opacity": "0"});
        }
    }, 300);
});

// $(".about-work").on("click", function() {
//     var scroll = $(window).scrollTop();
//     $(".about-work").toggleClass("expand");
//     $(".about-work").toggleClass("col-lg-6");
//     setTimeout(function () {
//         $(".about-work").animate({"top": scroll, "left": "0", "position": "absolute", "height": "100vh"});
//     }, 350);
//     // $("body").css('overflow', 'hidden');
// });
