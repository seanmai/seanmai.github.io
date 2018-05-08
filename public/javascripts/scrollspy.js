$(document).ready(function(){
    setBindings();
    $('body').scrollspy({target: ".navbar", offset: 150});
    var navScrollspy = setInterval(function(){
        if($(".about-me").hasClass("expand-width")){
            $(".nav-work").removeClass("active");
        } else if ($(".nav-me").hasClass("active") && !$(".nav-work").hasClass("active")){
            $(".nav-work").addClass("active");
        } else if ($(".about-work").hasClass("expand-width")){
            $(".nav-me").removeClass("active");
        } else if ($(".nav-work").hasClass("active") && !$(".nav-me").hasClass("active")){
            $(".nav-me").addClass("active");
        }
    }, 100);
});


function setBindings(){
    $(".nav-item").click(function(event){
        event.preventDefault();
        var sectionId = event.currentTarget.id + "Section";
        if(window.innerWidth <= 768){
            var navHeight = $(".navbar-light").outerHeight()-$(".navbar-collapse").outerHeight() ||  $(".navbar-custom").outerHeight()-43-$(".navbar-collapse").outerHeight();
        } else {
            var navHeight = $(".navbar-light").outerHeight() || $(".navbar-custom").outerHeight()-38.6;
        }

        $("html, body").animate({
            scrollTop: ($("#" + sectionId).offset().top)-navHeight
        }, 500);
        if(sectionId == "aboutSection"){
            openAboutMe();
        } else if (sectionId === "workSection") {
            openAboutWork();
        }
    });
};
