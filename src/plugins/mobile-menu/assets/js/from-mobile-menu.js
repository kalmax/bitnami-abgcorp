jQuery(document).ready(function(){

    var selector;
    var elContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/mobile-menu.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              elContainer = window.document.querySelector(`${selector} .from-mobile-menu-container`);
              buildMenu(elContainer);
            });

        }
    });

    // Front end
    jQuery(window).on('elementor/frontend/init', function () {

        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/mobile-menu.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              elContainer = window.document.querySelector(`${selector} .from-mobile-menu-container`);
              buildMenu(elContainer);
            });

        }
    });

    /**
     * @description Builds the menu events
     * @param el element
     * @return void
     */
    function buildMenu(el) {
   
      if (el && el !== 'undefined') {
        
        var bgIsOpaque = true;

        // set menu bg
        if(jQuery(el).hasClass('menu-light')){
          bgIsOpaque = false;
        }

        if(!jQuery("body").hasClass('home')){
          bgIsOpaque = true;
        }

        if(!bgIsOpaque){
          jQuery(".elementor-widget-mobile-menu").css({ "position" : "fixed" });
          jQuery(".elementor-location-header").css({ "height" : 0 });
        }

        // burger menu
        jQuery(el).find('.header .burger').click(function(e){

          e.preventDefault();
          jQuery(el).find('.links-container').removeClass('collapsed');
          jQuery(this).hide();
          jQuery(el).find('.header .close').show();

          if(!bgIsOpaque) {
            jQuery(el).find('.logo-opaque').css({ "display" : "block"});
            jQuery(el).find('.logo-light').css({ "display" : "none"});
          }

          jQuery(el).css({ "background" : "#ffffff" });

        });

        jQuery(el).find('.header .close').click(function(e){

          e.preventDefault();
          jQuery(el).find('.links-container').addClass('collapsed');
          jQuery(this).hide();
          jQuery(el).find('.header .burger').show();

          if(!bgIsOpaque) {
            jQuery(el).find('.logo-opaque').css({ "display" : "none"});
            jQuery(el).find('.logo-light').css({ "display" : "block"});
            jQuery(el).find('.burger-light').css({ "display" : "block"});
            jQuery(el).find('.burger-opaque').css({ "display" : "none"});
            jQuery(el).css({ "background-color" : "transparent" });
            jQuery(el).css({ "background" : "linear-gradient(180deg,rgba(0,0,0,.65) 0,transparent)" });
          }

        });

        // menu item click
        jQuery(el).find('.links .has-children').click(function(e){

          e.preventDefault();

          if(jQuery(this).parent().hasClass('collapsed')){
            jQuery(this).parent().removeClass('collapsed');
          } else {
            jQuery(this).parent().addClass('collapsed');
          }

        });

        // click outside
        jQuery('html').click(function(event) {
            if (jQuery(event.target).closest('.from-mobile-menu, .from-mobile-menu .burger').length === 0) {
              jQuery(el).find('.links-container').addClass('collapsed');
              jQuery(el).find('.header .burger').show();
              jQuery(el).find('.header .close').hide();
            }
        });

        // search
        jQuery(el).find(".search-box .btn-search").click(function(e) {
          e.preventDefault();
          let searchUrl = jQuery(el).find(".search-box .input-search").data('url');
          let searchStr = jQuery(el).find(".search-box .input-search").val();
          let searchStrEncoded = encodeURIComponent(searchStr);

          if(searchStr){
            window.location.href = `${searchUrl}?s=${searchStrEncoded}`;
          }
        });
        
        if (window.matchMedia("(max-width: 1024px)").matches) {
          
          var fmmlastScrollTop = 0;

          jQuery(window).scroll(function(){
            
            if(jQuery(this).scrollTop() >  jQuery(el).outerHeight()) {

              if(!bgIsOpaque){
                jQuery(el).find('.logo-opaque').css({ "display" : "block"});
                jQuery(el).find('.logo-light').css({ "display" : "none"});
                jQuery(el).find('.burger-light').css({ "display" : "none"});
                jQuery(el).find('.burger-opaque').css({ "display" : "block"});
                jQuery(el).css({ "background" : "#ffffff" });
              }

              jQuery(".elementor-widget-mobile-menu").css({ "position" : "relative" });
              jQuery(".elementor-location-header").css({ "height" : "auto" });

            } else {
              
              if(!bgIsOpaque){
                jQuery(el).css({ "background-color" : "transparent" });
                jQuery(el).css({ "background" : "linear-gradient(180deg,rgba(0,0,0,.65) 0,transparent)" });
                jQuery(el).find('.logo-opaque').css({ "display" : "none"});
                jQuery(el).find('.logo-light').css({ "display" : "block"});
                jQuery(el).find('.burger-light').css({ "display" : "block"});
                jQuery(el).find('.burger-opaque').css({ "display" : "none"});
                jQuery(".elementor-widget-mobile-menu").css({ "position" : "fixed" });
                jQuery(".elementor-location-header").css({ "height" : 0 });
              }

            }

            var st = jQuery(this).scrollTop();
          
            fmmlastScrollTop = st;

          });

        }

      }

    }

});