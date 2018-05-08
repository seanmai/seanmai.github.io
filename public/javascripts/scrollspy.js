$(document).ready(function(){
    setBindings();
    setCarets();
    $('body').scrollspy({target: ".navbar", offset: 200});
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
        if(window.innerWidth <= 768){   //Adjusting navbar height for different media view sizes
            var navHeight = $(".navbar-light").outerHeight()-$(".navbar-collapse").outerHeight() ||  $(".navbar-custom").outerHeight()-43-$(".navbar-collapse").outerHeight();
        } else {
            var navHeight = $(".navbar-light").outerHeight() || $(".navbar-custom").outerHeight()-38.6;
        }

        var timeout = 0;
        if(sectionId == "aboutSection"){
            if($(".about-work-expanded").css("visibility")=="visible"){   //Collapsing expanded sections
                timeout = 700;
                toggleAboutWork();
            }
            setTimeout(function(){
                openAboutMe();
            }, timeout);
        } else if (sectionId === "workSection") {
            if($(".about-me-expanded").css("visibility")=="visible"){
                timeout = 400;
                toggleAboutMe();
            }
            setTimeout(function(){
                openAboutWork();
            }, timeout);
        } else if (sectionId === "homeSection") {
            if($(".about-work-expanded").css("visibility")=="visible"){
                toggleAboutWork();
            } else if($(".about-me-expanded").css("visibility")=="visible"){
                toggleAboutMe();
            }
        }
        setTimeout(function(){
            $("html, body").animate({
                scrollTop: ($("#" + sectionId).offset().top)-navHeight
            }, 500);
        }, timeout);
    });
};

function setCarets(){
    $("#caret-down").click(function(event){
        event.preventDefault();

            var navHeight = $(".navbar-light").outerHeight() || $(".navbar-custom").outerHeight()-42;
        event.preventDefault();
        $("html, body").animate({
            scrollTop: ($("#aboutSection").offset().top)-navHeight
        }, 500);
    });
};
