jQuery(document).ready(function(){

    var selector;
    var elContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/jump-to-menu.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              elContainer = window.document.querySelector(`${selector} .from-jump-to-menu-container`);
              buildJumpToMenu(elContainer);
            });

        }
    });

    // Front end
    jQuery(window).on('elementor/frontend/init', function () {

        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/jump-to-menu.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              elContainer = window.document.querySelector(`${selector} .from-jump-to-menu-container`);
              buildJumpToMenu(elContainer);
            });

        }
    });

    /**
     * @description Foreach of the carousel elements initiate a Slick carousel.
     *
     * @param {object} $scope
     * @return void
     */
    function buildJumpToMenu(el) {
   
      if (el && el !== 'undefined') {
        
        // expand jump to menu list
        jQuery(el).find('.dropdown .caret').click(function(e){

          e.preventDefault();

          if(jQuery(el).find('.links-container').hasClass('collapsed')){
            jQuery(el).find('.links-container').removeClass('collapsed');
          }
          
          jQuery(el).find('.dropdown').css({ "display" : "none" });

        });

        // menu item click 
        jQuery(el).find('.from-jump-to-menu-item a').click(function(e){

          e.preventDefault();

          let sectionId = jQuery(this).attr('id').replace('from-jump-to-','');
       
          jQuery('html, body').animate({
            scrollTop: jQuery(`#${sectionId}`).offset().top
          }, 1500);

        });
        
        // close menu list
        jQuery(el).find('.header .close').click(function(e){

          e.preventDefault();

          jQuery(el).find('.dropdown').css({ "display" : "flex" });
          jQuery(el).find('.links-container').addClass('collapsed');

        });


      }

    }


});