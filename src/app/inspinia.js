/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 * Custom scripts
 */

$(document).ready(function () {

    fix_height();

});

// Full height of sidebar
function fix_height() {
    var heightWithoutNavbar = $("body > #wrapper").height() - 61;
    $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    var windowHeight = $( window ).height();
    $("#page-wrapper").css("min-height", windowHeight + "px");
};

$(window).bind("load resize click scroll", function() {
    if(!$("body").hasClass('body-small')) {
        fix_height();
    }
});

// Minimalize menu when screen is less than 768px
$(window).bind("load resize", function() {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

