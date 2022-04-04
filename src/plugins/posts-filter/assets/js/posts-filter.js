jQuery(document).ready(function(){

    var selector;
    var slickContainer;

    // For the editor page
    jQuery(document).ready(function () {
        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/posts-filter.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              slickContainer = window.document.querySelector(`${selector} .from-posts-filter-container`);
              buildPostFilter(slickContainer);
            });

        }
    });

    // Front end
    jQuery(window).on('elementor/frontend/init', function () {

        // Sanity Check
        if (window.elementorFrontend && 'undefined' !== window.elementorFrontend) {

            elementorFrontend.hooks.addAction('frontend/element_ready/posts-filter.default', function($scope) {
              selector = `.elementor-element-${$scope[0].dataset.id}`;
              slickContainer = window.document.querySelector(`${selector} .from-posts-filter-container`);
              buildPostFilter(slickContainer);
            });

        }
    });

    jQuery(window).on('resize', function () {
      // selector = `.elementor-element-${$scope[0].dataset.id}`;
      console.log('RESET style on resize', selector);
      // jQuery(selector).find("#from-posts-filter-mobile-trigger").parent().hide();
      jQuery('.elementor-widget-container').find('.from-posts-filter-wrapper').removeClass('overlay');
      
      jQuery('.elementor-widget-container').find(".filters-container").removeAttr("style");
    });

    /**
     * @description Initializes widget script
     *
     * @param {object} $scope
     * @return void
     */
    function buildPostFilter(el) {

     if (el && el !== 'undefined') {

        let queryData = {
          action: "from_posts_filter",
          limit: jQuery(el).data('limit')
        };
        
        jQuery(el).find("#from-posts-filter-mobile-trigger").on('click',function(e) {
          jQuery(el).find("#from-posts-filter-mobile-trigger").parent().hide();
          jQuery(el).find("#from-posts-filter-mobile-trigger").closest('.from-posts-filter-wrapper').addClass('overlay');
          
          jQuery(el).find(".filters-container").show();
        });
        jQuery(el).find("#apply-filters, .from-posts-filter-title-container h2 span").on('click',function(e) {
          jQuery(el).find("#from-posts-filter-mobile-trigger").parent().show();
          jQuery(el).find("#from-posts-filter-mobile-trigger").closest('.from-posts-filter-wrapper').removeClass('overlay');
          
          jQuery(el).find(".filters-container").hide();
        });
        
        jQuery(el).find("#from-posts-filter-select-category").on('change',function(e) {

          e.preventDefault(); 
          queryData['nonce'] = jQuery(this).attr("data-nonce");
          queryData['category_id'] = jQuery(this).val();
          ajaxFilterReq(el, queryData);   

        });

        jQuery(el).find("#from-posts-filter-select-year").on('change',function(e) {
          e.preventDefault(); 
          queryData['nonce'] = jQuery(this).attr("data-nonce");
          queryData['year'] = jQuery(this).val();
          ajaxFilterReq(el, queryData);   

       });


       jQuery(el).find("#from-posts-filter-select-month").on('change',function(e) {
          e.preventDefault(); 
          queryData['nonce'] = jQuery(this).attr("data-nonce");
          queryData['month'] = jQuery(this).val();
          ajaxFilterReq(el, queryData);   

       });

      }

    }

    function dateFormater(date) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var day = date.getDate();
      var month = months[date.getMonth()];
      var year = date.getFullYear();
    
      return month + ' ' + ordinal(day) + ', ' + year;
    }
    
    function ordinal (d) {
      const nth = { '1': 'st', '2': 'nd', '3': 'rd' }
      return `${d}${nth[d] || 'th'}`
    }

    function ajaxFilterReq(el, data){

      jQuery.ajax({
        type : "post",
        dataType : "json",
        url : scriptData.ajaxurl,
        data : data,
        success: function(response) {
          
            let targetEl = jQuery(`#${jQuery(el).data('target')}`);
            let isSlider = targetEl.find(".from-posts-carousel-container").length;
            let body = targetEl.find(".post-list");
            
            if(jQuery(el).data('target')){

              // remove existing post item elements
              if(isSlider){
                body.slick('unslick');
              }
              
              body.html("");

              // loop posts and append to body
              for(var post of response.posts) {

                var postDate  = new Date(post.post_date);
                postDate = dateFormater(postDate);

                var postItemHtml = "";

                if(isSlider){
                  
                  // FROM Posts Carousel
                  postItemHtml = `<div class="from-posts-carousel--item-wrapper">
                    <a href="${post.page_url}" class="from-posts-carousel--image" style="background-image:url(${post.featured_image_thumbnail});" target="_blank" ></a> 
                    <div class="from-posts-carousel--details">
                      <h3 class="from-posts-carousel--title"><a href="${post.page_url}" target="_blank" >${post.post_title}</a></h3>
                      <p class="from-posts-carousel--date">${postDate}</p>
                      <p class="from-posts-carousel--description">${post.post_excerpt}</p>
                      <a href="${post.page_url}" target="_blank" class="from-posts-carousel--link btn-from btn-from-link">
                        <span style="text-transform:capitalize"> Find out more </span>
                        <span class="line"></span>
                      </a>
                    </div>
                  </div>`;

                } else {
                    
                  // FROM Posts Wiget
                  postItemHtml = `<div class="from-posts--item">
                    <a href="${post.page_url}" class="from-posts--image" style="background-image:url(${post.featured_image_thumbnail});" target="_blank" ></a> 
                    <div class="from-posts--details">
                      <h3 class="from-posts--title"><a href="${post.page_url}" target="_blank" >${post.post_title}</a></h3>
                      <?php if($show_date_field === "yes"):?>
                        <p class="from-posts--date"><?=$post_date;?> </p>
                      <?php endif;?>
                      <a href="${post.page_url}" target="_blank" class="from-posts--link btn-from btn-from-link">
                        <span> Find out more </span>
                        <span class="line"></span>
                      </a>
                    </div>
                  </div>`;

                }
                

                body.append(postItemHtml);

              }
                
            }
            
            // initialize slick slider if it is for post-carousel widget
            if(isSlider){

              body.not('.slick-initialized').slick({
                infinite: true,
                autoplay: false,
                slidesToShow: body.data('columns'),
                slidesToScroll: 1,
                dots: false,
                prevArrow: false,
                nextArrow: false,
                responsive: [
                  {
                    breakpoint: 769,
                    settings: {
                      slidesToShow: body.data('columnstablet'),
                      slidesToScroll: 1,
                      arrows: false
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: body.data('columnsmobile'),
                      slidesToScroll: 1,
                      arrows: false
                    }
                  }
                ]
              });

            }

        },
        error : function(error){ console.log(error) }
      });
    }

});