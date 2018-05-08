function toggleAboutMe() {
    $(".about-me").toggleClass("expand-width");
    $(".about-me").toggleClass("col-lg-6");
    $(".about-work").css({"display": "none"});  //Before timeout to disappear more cleanly
    setTimeout(function () {
        $(".about-item").toggleClass("hover-underline-right");
        if($(".about-me-content").css("visibility")!="hidden"){
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
    $(".about-me").addClass("expand-width");
    $(".about-me").removeClass("col-lg-6");
    $(".about-work").css({"display": "none"});
    setTimeout(function () {
        $(".about-item").removeClass("hover-underline-right");
        $(".about-content").css({"visibility": "hidden", "opacity": "0"});
        $(".about-me-expanded").css({"visibility": "visible", "opacity": "1"});
    }, 300);
}

function toggleAboutWork(){
    event.preventDefault();
    if(window.innerWidth <= 768){
        var navHeight = $(".navbar-light").outerHeight()-$(".navbar-collapse").outerHeight() ||  $(".navbar-custom").outerHeight()-43-$(".navbar-collapse").outerHeight();
    } else {
        var navHeight = $(".navbar-light").outerHeight() || $(".navbar-custom").outerHeight()-38.6;
    }

    $("html, body").animate({
        scrollTop: ($("#workSection").offset().top)-navHeight
    }, 250);
    $(".about-work").toggleClass("expand-width");
    $(".about-work").toggleClass("col-lg-6");
    $(".about-me").css({"display": "none"});
    setTimeout(function () {
        $(".about-work").toggleClass("expand-height");
        if($(".about-work-content").css("visibility")!="hidden"){
            $(".about-content").css({"visibility": "hidden", "opacity": "0"});
            $(".about-work-expanded").css({"visibility": "visible", "opacity": "1"});
            $("body").css("overflow", "hidden");
        } else{
            $(".about-content").css({"visibility": "visible", "opacity": "1"});
            $(".about-work-expanded").css({"visibility": "hidden", "opacity": "0"});
            $(".about-me").css({"display": "flex"});
            $("body").css("overflow", "visible");
        }
    }, 350);
}

function openAboutWork(){
    $(".about-work").addClass("expand-width");
    $(".about-work").removeClass("col-lg-6");
    $(".about-me").css({"display": "none"});
    setTimeout(function () {
        $(".about-work").addClass("expand-height");

            $(".about-content").css({"visibility": "hidden", "opacity": "0"});
            $(".about-work-expanded").css({"visibility": "visible", "opacity": "1"});
            $("body").css("overflow", "hidden");

    }, 350);
}
