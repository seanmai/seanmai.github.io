$(".about-me").on("click", function() {
    toggleAboutMe();
});

$(".about-work").on("click", function() {
    event.preventDefault();
    if(window.innerWidth <= 768){
        var navHeight = $(".navbar-light").outerHeight()-$(".navbar-collapse").outerHeight() ||  $(".navbar-custom").outerHeight()-43-$(".navbar-collapse").outerHeight();
    } else {
        var navHeight = $(".navbar-light").outerHeight() || $(".navbar-custom").outerHeight()-38.6;
    }

    $("html, body").animate({
        scrollTop: ($("#" + sectionId).offset().top)-navHeight
    }, 500);
    // $(".about-work").toggleClass("expand");
    // $(".about-work").toggleClass("col-lg-6");
    // setTimeout(function () {
    //     $(".about-work").animate({"top": scroll, "left": "0", "position": "absolute", "height": "100vh"});
    // }, 350);
    // $("body").css('overflow', 'hidden');
});
