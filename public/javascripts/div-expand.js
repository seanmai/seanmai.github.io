function toggleAboutMe() {
    console.log("clicked!");
    $(".about-me").toggleClass("expand");
    $(".about-me").toggleClass("col-lg-6");
    $(".about-work").css({"display": "none"});  //Before timeout to disappear more cleanly
    setTimeout(function () {
        $(".about-item").toggleClass("hover-underline-right");
        if($(".about-content").css("visibility")!="hidden"){
            $(".about-content").css({"visibility": "hidden", "opacity": "0"});
            $(".about-me-expanded").css({"visibility": "visible", "opacity": "1"});
        } else{
            $(".about-content").css({"visibility": "visible", "opacity": "1"});
            $(".about-me-expanded").css({"visibility": "hidden", "opacity": "0"});
            $(".about-work").css({"display": "flex"});
        }
    }, 300);
};

function openAboutMe() {
    $(".about-me").addClass("expand");
    $(".about-me").removeClass("col-lg-6");
    $(".about-work").css({"display": "none"});
    setTimeout(function () {
        $(".about-item").removeClass("hover-underline-right");
        $(".about-content").css({"visibility": "hidden", "opacity": "0"});
        $(".about-me-expanded").css({"visibility": "visible", "opacity": "1"});
    }, 300);
}

// $(".about-work").on("click", function() {
//     event.preventDefault();
//     if(window.innerWidth <= 768){
//         var navHeight = $(".navbar-light").outerHeight()-$(".navbar-collapse").outerHeight() ||  $(".navbar-custom").outerHeight()-43-$(".navbar-collapse").outerHeight();
//     } else {
//         var navHeight = $(".navbar-light").outerHeight() || $(".navbar-custom").outerHeight()-38.6;
//     }
//
//     $("html, body").animate({
//         scrollTop: ($("#" + sectionId).offset().top)-navHeight
//     }, 500);
//     // $(".about-work").toggleClass("expand");
//     // $(".about-work").toggleClass("col-lg-6");
//     // setTimeout(function () {
//     //     $(".about-work").animate({"top": scroll, "left": "0", "position": "absolute", "height": "100vh"});
//     // }, 350);
//     // $("body").css('overflow', 'hidden');
// });
