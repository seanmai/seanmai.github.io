$(document).ready(function(){
    setBindings();
    // $('body').scrollspy({target: ".navbar", offset: 50});
});

function setBindings(){
    $(".nav-item").click(function(event){
        event.preventDefault();
        var sectionId = event.currentTarget.id + "Section";
        var navHeight = $(".navbar-light").outerHeight()-$(".navbar-collapse").outerHeight() ||  $(".navbar-custom").outerHeight()-43-$(".navbar-collapse").outerHeight() || $(".navbar-light").outerHeight() || $(".navbar-custom").outerHeight()-38.6;
        console.log(navHeight);
        $("html, body").animate({
            scrollTop: ($("#" + sectionId).offset().top)-navHeight
        }, 500);

    });
};
