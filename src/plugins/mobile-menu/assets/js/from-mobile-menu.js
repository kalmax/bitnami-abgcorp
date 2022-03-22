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
        
        // burger menu
        jQuery(el).find('.header .burger').click(function(e){

          e.preventDefault();

          if(jQuery(el).find('.links-container').hasClass('collapsed')){
            jQuery(el).find('.links-container').removeClass('collapsed');
          } else {
            jQuery(el).find('.links-container').addClass('collapsed');
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
       jQuery(document).mouseup(e => {
        if (!jQuery(this).is(e.target) && jQuery(this).has(e.target).length === 0) {
          jQuery(el).find('.links-container').addClass('collapsed');
        }
       });


      }

    }


});