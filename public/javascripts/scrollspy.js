$(document).ready(function(){
    setBindings();
    $('body').scrollspy({target: ".navbar", offset: 150});
    var navScrollspy = setInterval(function(){
        if($(".about-me").hasClass("expand")){
            $(".nav-work").removeClass("active");
        } else if ($(".nav-me").hasClass("active") && !$(".nav-work").hasClass("active")){
            $(".nav-work").addClass("active");
        }
    }, 100);
});

function setBindings(){
    $(".nav-item").click(function(event){
        event.preventDefault();
        var sectionId = event.currentTarget.id + "Section";
        var navHeight = $(".navbar-light").outerHeight()-$(".navbar-collapse").outerHeight() ||  $(".navbar-custom").outerHeight()-43-$(".navbar-collapse").outerHeight() || $(".navbar-light").outerHeight() || $(".navbar-custom").outerHeight()-38.6;
        $("html, body").animate({
            scrollTop: ($("#" + sectionId).offset().top)-navHeight
        }, 500);
        if(sectionId == "aboutSection"){
            $(".about-me").addClass("expand");
            $(".about-me").removeClass("col-lg-6");
            $(".about-work").css({"display": "none"});
            setTimeout(function () {
                $(".about-item").removeClass("hover-underline-right");
                $(".about-content").css({"visibility": "hidden", "opacity": "0"});
                $(".about-me-expanded").css({"visibility": "visible", "opacity": "1"});
            }, 300);
        } else if (sectionId === "workSection") {

        }
    });
};
