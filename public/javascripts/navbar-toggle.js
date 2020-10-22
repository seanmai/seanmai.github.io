$(window).scroll(function() {
    var height = $(window).scrollTop();

    if(height  > 0) {
        $( ".navbar" ).removeClass( "navbar-custom navbar-dark bg-dark");
        $( ".navbar" ).addClass( "navbar-light bg-white");
        $("#caret-down a").css({"display": "none"});  //Toggle caret to disappear when window moves down

    } else {
        $( ".navbar" ).removeClass( "navbar-light bg-white");
        $( ".navbar" ).addClass( "navbar-custom navbar-dark bg-dark");
        $("#caret-down a").css({"display": "inline-block"});
    }
});

// use bg-faded for transparent
