jQuery(document).ready(function(){

    var selector;
    var slickContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/posts-carousel.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              slickContainer = window.document.querySelector(`${selector} .from-posts-carousel-container`);
              destroyCarousel(slickContainer);
              buildSlickCarousel(slickContainer);
            });

        }
    });

    // Front end
    jQuery(window).on('elementor/frontend/init', function () {

        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/posts-carousel.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              slickContainer = window.document.querySelector(`${selector} .from-posts-carousel-container`);
              destroyCarousel(slickContainer);
              buildSlickCarousel(slickContainer);
            });

        }
    });

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
          slidesToShow: el.dataset.columns,
          slidesToScroll: 1,
          dots: false,
          prevArrow: false,
          nextArrow: false,
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: el.dataset.columnstablet,
                slidesToScroll: 1,
                arrows: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: el.dataset.columnsmobile,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
        });

      }

    }



});