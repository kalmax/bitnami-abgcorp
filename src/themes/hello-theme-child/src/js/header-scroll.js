jQuery(function ($) {
  
  $(document).ready(function () {
    
    var header = $('.elementor-location-header');
    var mobileMenu = $('.elementor-widget-mobile-menu');
    var jumpToMenu = $(".elementor-widget-jump-to-menu");

    if (window.matchMedia("(max-width: 1024px)").matches) {
      
       var lastScrollTop = 0;

      $(window).scroll(function(){
        
        if($(this).scrollTop() > header.outerHeight()) {
          header.addClass("fixed");
        } else {
          header.removeClass("fixed");
        }

        var st = $(this).scrollTop();
      
        if (st > lastScrollTop){
          mobileMenu.hide();
          jumpToMenu.find(".from-jump-to-menu-container").removeClass("hide");
        } else {
          mobileMenu.show();
        }
        lastScrollTop = st;

      });

    }

  });

});