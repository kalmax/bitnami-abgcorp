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
              buildPostTabs(tabContainer);
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
              tabContainer = window.document.querySelector(`${selector} .from-tabs-container`);
              tablSlickContainer = window.document.querySelector(`${selector} .from-tabs-container-mobile .tab-contents-mobile`);
              buildPostTabs(tabContainer);
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
    function buildPostTabs(el) {
   
     if (el && el !== 'undefined') {

        // about page tab
        var indicatorInitialPosition, indicatorNewPosition, indicatorTemporaryPosition = 0;
        
        // getting inital indicator position
        if (jQuery('.from-tabs .tab-marker .marker').length > 0) {
          indicatorInitialPosition = jQuery('.from-tabs .tab-marker .marker').position().left;
        }

        // set first tab content open
        openTab(el, 0);

        jQuery(el).find(".tab-link").on('click', function (e) {
  
          // setting new indicator position if tab is clicked
          indicatorNewPosition = indicatorTemporaryPosition;

          // Hide and Show of tab contents
          var tabId = jQuery(this).attr('id').replace("from-tabs-nav-","");

          jQuery(this).parent().parent().find('.tab-marker .marker').css({ 'left': indicatorNewPosition + 'px' })
            
          // open tab
          openTab(el, tabId);

          // setting new initial indicator position
          indicatorInitialPosition = indicatorNewPosition;

          e.preventDefault();

        });
    
        jQuery(el).find(".tab-link").hover(function () {
          
          // calculating and applying indicator temporary new position
          var item = jQuery(this).attr('item');
          var indicatorWidth = jQuery(this).parent().parent().find('.tab-marker .marker').width();

          var left = item * indicatorWidth;
          jQuery(this).parent().parent().find('.tab-marker .marker').css({ 'left': left + 'px' });
            indicatorTemporaryPosition = left;
          }, () => {

          if (!indicatorNewPosition) {
            // returning indicator to its initial position
            jQuery(this).parent().parent().find('.tab-marker .marker').css({ 'left': indicatorInitialPosition + 'px' });
          }
          else {
            // reseting indicator new and temporary position
            indicatorNewPosition = 0;
            indicatorTemporaryPosition = 0;
          }

        });

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

      }

    }




});