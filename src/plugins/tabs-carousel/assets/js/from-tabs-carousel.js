jQuery(document).ready(function(){

    let selector;
    let tabContainer;
    let tablSlickContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/from-tabs-carousel.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              tabContainer = window.document.querySelector(`${selector} .from-tabs-carousel-container`);
              tablSlickContainer = window.document.querySelector(`${selector} .from-tabs-carousel-list`);
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

            elementorFrontend.hooks.addAction('frontend/element_ready/from-tabs-carousel.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              tabContainer = window.document.querySelector(`${selector} .from-tabs-carousel-container`);
              tablSlickContainer = window.document.querySelector(`${selector} .from-tabs-carousel-list`);
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
    
      jQuery(window).on('hashchange', function(e){
        
        var hash = window.location.hash;
        let tabIndex = hash.replace('#brands-', ''); 

        jQuery(el).find(".slick-slide").each(function(index){
          jQuery(this).attr('class', jQuery(this).attr('class').replace(' active', '') );
        });
        
        jQuery(el).find(`[data-slick-index='${tabIndex}']`).addClass("active");
        openTab(el, tabIndex);

        // go to section
        jQuery('html, body').animate({
          scrollTop: jQuery(el).find('.from-tabs-carousel-list').offset().top
        }, 1000);

        jQuery(el).find('.from-tabs-carousel-list').slick('slickGoTo', parseInt(tabIndex));
    
      });
   
     if (el && el !== 'undefined') {
        
        let tabLink = jQuery(el).find('.from-tabs-carousel-list--item');
       
        // open first tab
        openTab(el, 0);

        tabLink.on('click',function(e){

          e.preventDefault();

          let _this = jQuery(this);

          var tabId = _this.data('slick-index');
        
          jQuery(el).find(".slick-slide").each(function(index){
            jQuery(this).attr('class', jQuery(this).attr('class').replace(' active', '') );
          });
          
          _this.addClass("active");
          openTab(el, tabId);

        });

      }

    }

    function openTab(el, tabId) {
      
      jQuery(el).find(".from-tabs-carousel-contents--item").each(function(index){
        jQuery(this).attr('class', jQuery(this).attr('class').replace(' active', '') );
      });

      jQuery(el).find(`#from-tabs-carousel-content-${tabId}`).addClass("active");

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
        
        let sliderParams = {
          infinite: true,
          autoplay: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          prevArrow:"<div class='elementor-icon slick-arrow-left'><button type='button' class='slick-prev pull-left'><i class='fas fa-chevron-left' aria-hidden='true'></i></button></div>",
          nextArrow:"<div class='elementor-icon slick-arrow-right'><button type='button' class='slick-next pull-right'><i class='fas fa-chevron-right' aria-hidden='true'></i></button></div>",
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
        };

        jQuery(el).not('.slick-initialized').slick(sliderParams); 
        
        // jQuery(el).not('.slick-initialized').slick({
        //   infinite: true,
        //   autoplay: false,
        //   slidesToShow: 1,
        //   slidesToScroll: 1,
        //   dots: false,
        //   prevArrow: false,
        //   nextArrow: false
        // });

        jQuery(el).on('beforeChange', function(event, slick, currentSlide, nextSlide){
          jQuery(el).find(".tab-contents-mobile-item").each(function(i){
            if(!jQuery(this).find(".content").hasClass('collapsed')){
              jQuery(this).find(".excerpt").css({ "display": "block"});
              jQuery(this).find(".content").addClass('collapsed');
              jQuery(this).find(".read-more").html("Read More");
            }
          });
        });

        // read more toggle
        jQuery(el).find(".read-more").click(function(e){

          e.preventDefault();

          if(jQuery(this).parent().find(".content").hasClass("collapsed")) {
              
            jQuery(this).parent().find(".excerpt").css({ "display": "none"});
            jQuery(this).parent().find(".content").removeClass("collapsed");   
            jQuery(this).html("Read Less");

          } else {
            
            jQuery(this).parent().find(".excerpt").css({ "display": "block"});
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