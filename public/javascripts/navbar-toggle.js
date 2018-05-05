$(window).scroll(function() {
    var height = $(window).scrollTop();

    if(height  > 0) {
        $( ".navbar" ).removeClass( "navbar-custom navbar-dark bg-dark");
        $( ".navbar" ).addClass( "navbar-light bg-white");
    } else {
        $( ".navbar" ).removeClass( "navbar-light bg-white");
        $( ".navbar" ).addClass( "navbar-custom navbar-dark bg-dark");
    }
});

// use bg-faded for transparent
