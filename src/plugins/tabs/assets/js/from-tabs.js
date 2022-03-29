jQuery(document).ready(function(){

    let selector;
    let tabContainer;
    let tablSlickContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/from-tabs.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              tabContainer = window.document.querySelector(`${selector} .from-tabs-container`);
              tablSlickContainer = window.document.querySelector(`${selector} .from-tabs-container-mobile .tab-contents-mobile`);
              buildTabs(tabContainer);
              destroyCarousel(tablSlickContainer);
              buildSlickCarousel(tablSlickContainer);
            });

        }
    });

    // Front end
    jQuery(window).on('elementor/frontend/init', function () {

        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/from-tabs.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              tabContainer = window.document.querySelector(`${selector} .from-tabs-container-desktop`);
              tablSlickContainer = window.document.querySelector(`${selector} .from-tabs-container-mobile .tab-contents-mobile`);
              buildTabs(tabContainer);
              destroyCarousel(tablSlickContainer);
              buildSlickCarousel(tablSlickContainer);
            });

        }
    });

    /**
     * @description Builds tabs based on posts
     *
     * @param {object} $scope
     * @return void
     */
    function buildTabs(el) {
   
     if (el && el !== 'undefined') {
        
        let tabLinks = jQuery(el).find('.tab-links .tab-link');
        let tabIndicator = jQuery(el).find('.tab-indicator')[0];

        tabLinks.css({ 'width': `calc(100% / ${tabLinks.length})` });
        tabIndicator.style.left = `calc(calc(100%/${tabLinks.length})*${0})`; 
        
        openTab(el, 0);
        
        for(let i=0;i<tabLinks.length;i++){
          tabLinks[i].addEventListener("click",function(){
            var tabId = jQuery(this).attr('id').replace("from-tabs-nav-","");
            tabIndicator.style.left = `calc(calc(100%/${tabLinks.length})*${i})`; 
            openTab(el, tabId);
          });
        }

      }

    }

    function openTab(el, tabId) {
      
      let tablinks = jQuery(el).find(".tab-contents .tab-contents-item");

      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      jQuery(el).find(`.tab-contents #from-tabs-content-${tabId}`).addClass("active");

    }

    jQuery(window).resize(function(){
      destroyCarousel();
      buildSlickCarousel();
    });

    function destroyCarousel(el) {     
      if (jQuery(el).hasClass('slick-initialized')) {       
        jQuery(el).slick('slickRemove', null, null, true);       
        jQuery(el).slick('destroy');     
      }         
    }

    /**
     * @description Foreach of the carousel elements initiate a Slick carousel.
     *
     * @param {object} $scope
     * @return void
     */
    function buildSlickCarousel(el) {
   
     if (el && el !== 'undefined') {
        
        jQuery(el).not('.slick-initialized').slick({
          infinite: true,
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          prevArrow: false,
          nextArrow: false
        });

        // read more toggle
        jQuery(el).find(".read-more").click(function(e){

          e.preventDefault();

          if(jQuery(this).parent().find(".content").hasClass("collapsed")) {

            jQuery(this).parent().find(".content").removeClass("collapsed");   
            jQuery(this).html("Read Less");

          } else {

            jQuery(this).parent().find(".content").addClass("collapsed");
            jQuery(this).html("Read More");
            
            jQuery('html, body').animate({
              scrollTop: jQuery(el).offset().top
            }, 1000);

          }    

        });

      }

    }


});