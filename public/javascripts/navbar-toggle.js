$(window).scroll(function() {
    var height = $(window).scrollTop();

    if(height  > 0) {
        $( ".navbar" ).removeClass( "navbar-custom navbar-dark bg-dark");
        $( ".navbar" ).addClass( "navbar-light bg-faded");
    } else {
        $( ".navbar" ).removeClass( "navbar-light bg-faded");
        $( ".navbar" ).addClass( "navbar-custom navbar-dark bg-dark");
    }
});
