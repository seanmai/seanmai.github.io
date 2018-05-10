$(".about-me").on("click", function() {
    toggleAboutMe();
});

$(".about-work").on("click", function() {
    if(!$(".about-work").hasClass("expand-height")){
        toggleAboutWork();
    }
});
$(".about-work-header").on("click", function() {
    toggleAboutWork();
});
